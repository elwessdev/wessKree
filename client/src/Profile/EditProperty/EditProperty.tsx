import "./style.scss";
import { useEffect, useLayoutEffect, useState } from 'react';
import { Form, Input, Select, Space, Flex, Spin, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { editProperty, propertyDetails } from "../../API/property";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { featuresList } from "../../Data/features";
import { useUser } from "../../hooks/userContext";

import { FaWhatsapp } from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';
import { VscQuestion } from "react-icons/vsc";
import { IoIosCheckmarkCircle } from "react-icons/io";



type featureProps = {
    feature: any;
    checked: boolean;
    onClick: () => void;
};
const FeatureItem = ({ feature, checked, onClick }: featureProps) => (
    <div className="f" onClick={onClick}>
        <div className="icon">{feature.icon}</div>
        <p>{feature.label}</p>
        <div className="ok">{checked && <IoIosCheckmarkCircle />}</div>
    </div>
);

type props = {
    propertyID?: string;
    formRef?: any;
    closeModel?: any;
}

const EditProperty = ({propertyID,formRef,closeModel}: props) => {
    const {user} = useUser();
    const queryClient = useQueryClient();   
    const [form] = Form.useForm();
    const [priceLease, setPriceLease] = useState<string[]>([]);

    // Get Property Details
    const {data, isLoading, error} = useQuery({
        queryFn: () => propertyDetails(propertyID),
        queryKey: ["propertyDetails", propertyID],
        enabled: !!propertyID
    });
    useLayoutEffect(()=>{
        // console.log(data);
        form.setFieldsValue({
            title: data?.title,
            type: data?.type,
            category: data?.category,
            area: {
                width: data?.area?.width,
                length: data?.area?.length
            },
            rooms: data?.rooms,
            bedrooms: data?.bedrooms,
            bathrooms: data?.bathrooms,
            kitchen: data?.kitchen,
            furnishingStatus: data?.furnishingStatus,
            leaseDuration: Object.keys(data?.price||{}),
            contact: {
                phone: data?.contact?.phone,
                whatsapp: data?.contact?.whatsapp
            },
            description: data?.description,
            state: data?.state,
            city: data?.city,
            zip: data?.zip,
            neighborhood: data?.neighborhood,
            status: data?.status
        });
        setPriceLease(Object.keys(data?.price||{}));
    },[data, propertyID, form])

    // Price Lease
    const handlePrice = (values:string[]) => {
        setPriceLease(values);
    }

    // Feature Checkbox
    const [checkedFeatures, setCheckedFeatures] = useState<Record<string, boolean>>(
        Object.fromEntries(featuresList.map(({ key }) => [key, false]))
    );
    const handleCheckboxChange = (feature: string) => {
        setCheckedFeatures((prev) => ({
            ...prev,
            [feature]: !prev[feature],
        }));
    };
    useEffect(()=>{
        if(data?.features){
            const newCheckedFeatures = Object.fromEntries(featuresList.map(({ key }) => [key, false]));
            data.features.forEach((feature: string) => {
                newCheckedFeatures[feature] = true;
            });
            setCheckedFeatures(newCheckedFeatures);
        }
    },[data])

    // Submit
    const handleSubmit = async(values: any) => {
        let updatedData = {};
        // console.log('Updated Values:', values);
        Object.entries(values).forEach((value:any)=>{
            if(value[0]=="leaseDuration"||value[0]=="price"||value[0]=="category"){
                updatedData = {...updatedData, [value[0]]:value[1]};
                return;
            }
            if(value[0]=="contact"){
                // let newContact = {};
                // if(data[value[0]]["phone"]==undefined||value[1]["phone"]!=data[value[0]]["phone"]){
                //     newContact = {"phone":value[1]["phone"]};
                // }
                // if(data[value[0]]["whatsapp"]==undefined||value[1]["whatsapp"]!=data[value[0]]["whatsapp"]){
                //     newContact = {...newContact,"whatsapp":value[1]["whatsapp"]};
                // }
                // if(Object.entries(newContact).length){
                //     updatedData = {...updatedData,[value[0]]:newContact};
                // }
                updatedData = {...updatedData,"contact":{
                    "phone":value[1]["phone"],
                    "whatsapp":value[1]["whatsapp"]
                }};
                return;
            }
            if (data[value[0]] && value[1]!=data[value[0]]) {
                updatedData = { ...updatedData, [value[0]]: value[1] };
            }
        });
        updatedData = {
            ...updatedData, 
            "features":Object.entries(checkedFeatures).filter((feature:any)=>feature[1]==true).map((feature:any)=>feature[0])
        };
        try {
            const res = await editProperty(updatedData,data._id,);
            if (data?._id) {
                queryClient.invalidateQueries({queryKey: ["propertyDetails", data._id]});
            }
            if (user?.username) {
                queryClient.invalidateQueries({queryKey: ["MyProperties", user.username]});
            }
            closeModel(false);
            message.success(res.message);
        } catch(err) {
            console.log(err);
            message.error("Something went wrong");
        }
    }

    return (
        <div className="editPropertyModel">
            {error && (
                <h3>Something wrong, Refresh page</h3>
            )}
            {isLoading && (
                <Spin size="large" style={{margin: "40px auto 0 auto", display: "block"}} />
            )}
            {data && (
                <>
                    <h2 style={{
                        margin: "0",
                        marginBottom: "25px"
                    }}
                    >
                        Edit Property
                    </h2>
                    <Form
                        form={form}
                        layout="vertical"
                        requiredMark='optional'
                        onFinish={handleSubmit}
                        style={{marginBottom: "20px"}}
                        ref={formRef}
                        >
                        <Flex gap={15} vertical>

                            {/*--------- STEP 1 -----------*/}
                            <Flex gap={15}>
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    label="Title" 
                                    name="title"
                                    rules={[{ required: true, message: "Please enter rent title" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Input placeholder="Enter title" />
                                </Form.Item>
                            </Flex>
                            <Flex gap={15}>
                                <Form.Item
                                    style={{ flex: 1 }}
                                    label="Status"
                                    name="status"
                                    rules={[{ required: true, message: "Please choose Status" }]}
                                >
                                    <Select
                                        placeholder="Choose Status"
                                        showSearch={false}
                                        options={[
                                            { value: 'available', label: 'Available' },
                                            { value: 'unavailable', label: 'Unavailable' },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item 
                                    style={{ flex: 1 }} 
                                    label="Furnishing Status" 
                                    name="furnishingStatus"
                                    rules={[{ required: true, message: "Please choose furnishing status" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Select
                                        placeholder="Choose Furnishing Status"
                                        showSearch={false}
                                        options={[
                                            { value: 'furnished', label: 'Furnished' },
                                            { value: 'semiFurnished', label: 'Semi-Furnished' },
                                            { value: 'unfurnished', label: 'Unfurnished' },
                                        ]}
                                    />
                                </Form.Item>
                            </Flex>

                            <Flex gap={15}>
                                <Form.Item
                                    style={{ flex: 1 }}
                                    label="Category"
                                    name="category"
                                    rules={[{ required: true, message: "Please choose category" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Select
                                        placeholder="Choose category"
                                        mode="multiple"
                                        showSearch={false}
                                        options={[
                                            { value: 'student', label: 'Student' },
                                            { value: 'family', label: 'Family' },
                                            { value: 'anyone', label: 'Anyone' },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    label="Lease Duration" 
                                    name="leaseDuration"
                                    rules={[{ required: true, message: "Please choose lease duration" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                    >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Select..."
                                        showSearch={false}
                                        onChange={handlePrice}
                                        options={[
                                            { value: 'month', label: 'Month' },
                                            { value: 'week', label: 'Week' },
                                            { value: 'day', label: 'Day' },
                                        ]}
                                    />
                                </Form.Item>
                            </Flex>
                            
                            {priceLease.length>0 && 
                                <Form.Item
                                    style={{flex:1}}
                                >
                                    <Space.Compact className='prices' style={{ flex: 1, gap: 5 }}  >
                                        {priceLease.includes("day") &&
                                            <Form.Item
                                                style={{textAlign: "center", width: "140px"}}
                                                label="Day Price"
                                                // style={{ flex: 1 }} 
                                                name={["price", "day"]}
                                                className='day'
                                                rules={[{ required: true, message: "Please enter price" }]}
                                                initialValue={data?.price.day}
                                            >
                                                <Input type='number' placeholder='Price'/>
                                            </Form.Item>
                                        }
                                        {priceLease.includes("week") &&
                                            <Form.Item
                                                style={{textAlign: "center", width: "140px"}}
                                                label="Week Price"
                                                // style={{ flex: 1 }} 
                                                name={["price", "week"]}
                                                className='week'
                                                rules={[{ required: true, message: "Please enter price" }]}
                                                initialValue={data?.price?.week}
                                            >
                                                <Input type='number' placeholder='Price'/>
                                            </Form.Item>
                                        }
                                        {priceLease.includes("month") &&
                                            <Form.Item
                                                style={{textAlign: "center", width: "140px"}}
                                                label="Month Price"
                                                // style={{ flex: 1 }} 
                                                name={["price", "month"]}
                                                className='month'
                                                rules={[{ required: true, message: "Please enter price" }]}
                                                initialValue={data?.price?.month}
                                            >
                                                <Input type='number' placeholder='Price'/>
                                            </Form.Item>
                                        }
                                    </Space.Compact>
                                </Form.Item>
                            }

                            <Flex gap={15}>
                                <Space.Compact className='con' style={{ flex: 1, gap: 15 }}  >
                                    <Form.Item
                                        style={{ flex: 1 }} 
                                        name={["contact", "phone"]}
                                    >
                                        <Input prefix={<MdPhone />} placeholder='Phone'/>
                                    </Form.Item>
                                    <Form.Item
                                        style={{ flex: 1 }} 
                                        name={["contact", "whatsapp"]}
                                    >
                                        <Input prefix={<FaWhatsapp />} placeholder='WhatsApp'/>
                                    </Form.Item>
                                </Space.Compact>
                            </Flex>

                            <Flex gap={15}>
                                <Form.Item
                                    style={{ flex: 1 }}
                                    label="Description"
                                    name="description"
                                    rules={[{ required: true, message: "Please enter description" }]}
                                    // tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                                >
                                    <TextArea
                                        placeholder="Enter description"
                                        autoSize={{ minRows: 4}}
                                    />
                                </Form.Item>
                            </Flex>

                            {/*--------- STEP 3 -----------*/}
                            <Form.Item
                                    style={{ flex: 1 }}
                                    label="Features"
                                    tooltip={{ title: 'Click to select the feature', icon: <VscQuestion /> }}
                                    required
                                >
                                <div className="features">
                                    {featuresList.map((feature:any) => (
                                        <FeatureItem
                                            key={feature.key}
                                            feature={feature}
                                            checked={checkedFeatures[feature.key]}
                                            onClick={() => handleCheckboxChange(feature.key)}
                                        />
                                    ))}
                                </div>
                            </Form.Item>
                        </Flex>
                    </Form>
                </>
            )}
        </div>
    )
};

export default EditProperty;