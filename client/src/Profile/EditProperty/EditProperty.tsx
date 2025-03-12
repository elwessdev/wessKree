import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import { useEffect, useState } from 'react';
import { Form, Input, Select, Space, Flex, InputNumber, Upload, Spin, UploadFile, Image, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { propertyDetails } from "../../API/property";
import { useQuery } from "@tanstack/react-query";

import { FaWhatsapp } from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';
import { TbMeterSquare } from 'react-icons/tb';
import { VscQuestion } from "react-icons/vsc";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { featuresList } from "../../Data/features";


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

const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
});

type props = {
    propertyID?: string;
    formRef?: any;
}

const EditProperty = ({propertyID,formRef}: props) => {
    const [form] = Form.useForm();
    const [priceLease, setPriceLease] = useState<string[]>([]);

    // Get Property Details
    const {data, isLoading, error} = useQuery({
        queryFn: () => propertyDetails(propertyID),
        queryKey: ["propertyDetails", propertyID],
        enabled: !!propertyID
    });

    useEffect(()=>{
        console.log(priceLease);
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
        });
    },[data,propertyID])

    const handlePrice = (values:string[]) => {
        setPriceLease(values);
        // if(data?.price){
        //     const newPriceList = Object.keys(data?.price).filter(key => !values.includes(key));
        //     newPriceList.forEach(key => delete data?.price[key]);
        // }
    }

    // Image Upload
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as any);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    useEffect(()=>{
        if(data?.imgs){
            const images = data.imgs.map((img: any, index: number) => ({
                uid: img.cloudId,
                name: `image-${index}`,
                status: 'done',
                url: img.url
            }));
            setFileList(images);
        }
    },[data])

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
    const handleSubmit = (values: any) => {
        const newData:any = {};
        Object.keys(values).forEach(function(key) {
            if(values[key]!=data[key]){
                newData[key] = values[key];
            }
        });

        console.log('Updated Values:', newData);
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
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    label="Type" 
                                    name="type"
                                    rules={[{ required: true, message: "Please choose type" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Select
                                        placeholder="Choose type"
                                        options={[
                                            { value: 'apartment', label: 'Apartment' },
                                            { value: 'house', label: 'House' },
                                            { value: 'villa', label: 'Villa' },
                                            // { value: 'Office', label: 'Office', },
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
                                    label="Total Area (m²)"
                                    required
                                >
                                    <Space.Compact style={{ flex: 1 }} >
                                        <Form.Item
                                            style={{ flex: 1 }} 
                                            name={["area","width"]}
                                            rules={[{ required: true, message: "Please enter width" }]}
                                        >
                                            <InputNumber type='number' placeholder="Width" />
                                        </Form.Item>
                                        <span className='x' style={{margin: "0 5px", position: "relative", top: "5px"}}>X</span>
                                        <Form.Item
                                            style={{ flex: 1 }} 
                                            name={["area","length"]}
                                            rules={[{ required: true, message: "Please enter length" }]}
                                        >
                                            <InputNumber type='number' placeholder="Length" />
                                        </Form.Item>
                                        <span 
                                            className='m2' 
                                            style={{fontSize: "20px", marginLeft: "2px", position: "relative", top: "-5px"}}
                                            >
                                                <TbMeterSquare />
                                        </span>
                                    </Space.Compact>
                                </Form.Item>
                            </Flex>
                            <Flex gap={15}>
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    label="Rooms" 
                                    name="rooms"
                                    rules={[{ required: true, message: "Please enter number of rooms" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Input type="number" placeholder="Number of rooms" />
                                </Form.Item>
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    label="Bedrooms" 
                                    name="bedrooms"
                                    rules={[{ required: true, message: "Please enter number of bedrooms" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Input type="number" placeholder="Number of bedrooms" />
                                </Form.Item>
                            </Flex>
                            <Flex gap={15}>
                                <Form.Item 
                                    style={{ flex: 1 }} 
                                    label="Bathrooms" 
                                    name="bathrooms"
                                    rules={[{ required: true, message: "Please enter number of bathrooms" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Input type="number" placeholder="Number of bathrooms" />
                                </Form.Item>
                                <Form.Item 
                                    style={{ flex: 1 }} 
                                    label="Kitchen" 
                                    name="kitchen"
                                    rules={[{ required: true, message: "Please enter number of kitchen" }]}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Input type="number" placeholder="Number of kitchen" />
                                </Form.Item>
                            </Flex>
                            <Flex gap={15}>
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
                            
                            {(data?.price && Object.entries(data?.price).length>0) && 
                                <Form.Item
                                    style={{flex:1}}
                                >
                                    <Space.Compact className='prices' style={{ flex: 1, gap: 5 }}  >
                                        {Object.keys(data?.price||{}).includes("day") &&
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
                                        {Object.keys(data?.price||{}).includes("week") &&
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
                                        {Object.keys(data?.price||{}).includes("month") &&
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

                            {/*--------- STEP 2 -----------*/}
                            <Flex gap={15}>
                                <Form.Item
                                    style={{ flex: 1 }}
                                    label="State"
                                    name="state"
                                    rules={[{ required: true, message: "Please choose state" }]}
                                    // initialValue={data?.state}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Select
                                        showSearch
                                        style={{ width: "100%" }}
                                        placeholder="Search..."
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            String(optionA?.label ?? '').toLowerCase().localeCompare(String(optionB?.label ?? '').toLowerCase())
                                        }
                                        // onChange={handleStateChange}
                                        // options={stateOptions}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ flex: 1 }}
                                    label="City"
                                    name="city"
                                    rules={[{ required: true, message: "Please choose city" }]}
                                    // initialValue={data?.city}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Select
                                        showSearch
                                        style={{ width: "100%" }}
                                        placeholder="Search..."
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            String(optionA?.label ?? '').toLowerCase().localeCompare(String(optionB?.label ?? '').toLowerCase())
                                        }
                                        // options={delegations}
                                        // value={delegationValue}
                                    />
                                </Form.Item>
                            </Flex>
                            <Flex gap={15}>
                                <Form.Item
                                    style={{ flex: 1 }}
                                    label="Zip/Postal Code"
                                    name="zip"
                                    rules={[{ required: true, message: "Please enter zip code" }]}
                                    // initialValue={data?.zip}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Input type='number' placeholder='Enter zip code' />
                                </Form.Item>
                                <Form.Item 
                                    style={{ flex: 1 }}
                                    label="Neighborhood/Area"
                                    name="neighborhood"
                                    // initialValue={data?.neighborhood}
                                    // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                >
                                    <Input placeholder='Enter the name of area or neighborhood' />
                                </Form.Item>
                            </Flex>
                            {/* <Flex gap={15} wrap>
                                <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
                                    <GoogleMap mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "3px", marginTop: "-10px" }} center={position} zoom={10} onClick={handleMarkerDrag}>
                                        <Marker position={position} draggable={true} onDragEnd={handleMarkerDrag} />
                                    </GoogleMap>
                                </LoadScript>
                            </Flex> */}

                            {/*--------- STEP 3 -----------*/}
                            <Form.Item
                                style={{ flex: 1 }}
                                label="Images"
                                tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                                required
                            >
                                <div className="gallery">
                                    <Upload
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                    >
                                        {fileList.length >= 4 ? null : uploadButton}
                                    </Upload>
                                    {previewImage && (
                                        <Image
                                            wrapperStyle={{ display: 'none' }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </div>
                            </Form.Item>
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