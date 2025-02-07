// import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Select, Space, Flex, InputNumber, Button } from 'antd';
// import { VscQuestion } from "react-icons/vsc";

// Icons
import { TbMeterSquare } from "react-icons/tb";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from 'react';

const { TextArea } = Input;

interface values {
    title: string | null,
    type: string | null,
    category: string[],
    rooms: number | null,
    bathrooms: number | null,
    bedrooms: number | null,
    kitchen: number | null,
    furnishingStatus: string | null,
    leaseDuration: string[],
    description: string | null,
    area:{
        width: number | null,
        length: number | null
    }
    contact:{
        phone?: string | null,
        whatsapp?: string | null
    },
    price: {
        day?:string | null,
        week?:string | null,
        month?:string | null,
    }
}
type props = {
    data: values | any,
    setData: any,
    next: () => void
}

// Fn
// const formatPrice = (value:any) => {
//     const numericValue = value.replace(/[^\d.]/g, "");
//     return new Intl.NumberFormat("fr-TN", {
//         style: "currency",
//         currency: "TND",
//         minimumFractionDigits: 0,
//     }).format(numericValue || 0);
// };

export default function Step1({data,setData,next}:props){
    const [form] = Form.useForm();
    const [priceLease, setPriceLease] = useState<string[]>([])

    const handlePrice = (values:string[]) => {
        setPriceLease(values);
        if(data?.price){
            const newPriceList = Object.keys(data?.price).filter(key => !values.includes(key));
            newPriceList.forEach(key => delete data?.price[key]);
        }
        // console.log(priceLease);
        // console.log(data?.price);
    }
    
    const handleSubmit = (values:values) => {
        console.log("step 1 data from child:", values);
        setData({
            ...values,
            rooms: Number(values?.rooms),
            bathrooms: Number(values?.bathrooms),
            bedrooms: Number(values?.bedrooms),
            kitchen: Number(values?.kitchen),
            price: {
                day: values?.price?.day,
                week: values?.price?.week,
                month: values?.price?.month,
            }
        });
        next();
    }
    
    return (
        <div className="step step1">
            <Form
                form={form}
                layout="vertical"
                requiredMark='optional'
                onFinish={handleSubmit}
                >
                <Flex gap={15} vertical>
                    <Flex>
                        <Form.Item 
                            style={{ flex: 1 }} 
                            label="Title" 
                            name="title"
                            rules={[{ required: true, message: "Please enter rent title" }]}
                            initialValue={data?.title}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input placeholder="Enter title" />
                        </Form.Item>
                    </Flex>

                    <Flex gap={15}>
                        <Form.Item
                            style={{ flex: 1 }} 
                            label="Type" 
                            name="type"
                            rules={[{ required: true, message: "Please choose type" }]}
                            initialValue={data?.type}
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
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Category"
                            name="category"
                            rules={[{ required: true, message: "Please choose category" }]}
                            initialValue={data?.category}
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
                    </Flex>

                    <Flex gap={15}>
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
                                    initialValue={data?.area.width}
                                >
                                    <InputNumber type='number' placeholder="Enter width" />
                                </Form.Item>
                                <span className='x'>X</span>
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    name={["area","length"]}
                                    rules={[{ required: true, message: "Please enter length" }]}
                                    initialValue={data?.area.length}
                                >
                                    <InputNumber type='number' placeholder="Enter length" />
                                </Form.Item>
                                <span className='m2'><TbMeterSquare /></span>
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }} 
                            label="Rooms" 
                            name="rooms"
                            rules={[{ required: true, message: "Please enter number of rooms" }]}
                            initialValue={data?.rooms}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type="number" placeholder="Number of rooms" />
                        </Form.Item>
                    </Flex>

                    <Flex gap={15}>
                        <Form.Item
                            style={{ flex: 1 }} 
                            label="Bedrooms" 
                            name="bedrooms"
                            rules={[{ required: true, message: "Please enter number of bedrooms" }]}
                            initialValue={data?.bedrooms}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type="number" placeholder="Number of bedrooms" />
                        </Form.Item>
                        <Form.Item 
                            style={{ flex: 1 }} 
                            label="Bathrooms" 
                            name="bathrooms"
                            rules={[{ required: true, message: "Please enter number of bathrooms" }]}
                            initialValue={data?.bathrooms}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type="number" placeholder="Number of bathrooms" />
                        </Form.Item>
                    </Flex>


                    <Flex gap={15}>
                        <Form.Item 
                            style={{ flex: 1 }} 
                            label="Kitchen" 
                            name="kitchen"
                            rules={[{ required: true, message: "Please enter number of kitchen" }]}
                            initialValue={data?.kitchen}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type="number" placeholder="Number of kitchen" />
                        </Form.Item>
                        <Form.Item 
                            style={{ flex: 1 }} 
                            label="Furnishing Status" 
                            name="furnishingStatus"
                            rules={[{ required: true, message: "Please choose furnishing status" }]}
                            initialValue={data?.furnishingStatus}
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
                            label="Lease Duration" 
                            name="leaseDuration"
                            rules={[{ required: true, message: "Please choose lease duration" }]}
                            initialValue={data?.leaseDuration}
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
                        {/* <Form.Item 
                            style={{ flex: 1 }} 
                            label="Available From" 
                            required 
                            tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <DatePicker onChange={onChange} style={{ width: '100%' }} />
                        </Form.Item> */}

                        <Form.Item
                            style={{ flex: 1 }} 
                            label="Contact"
                            // tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                            >
                                <Space.Compact className='con' style={{ flex: 1, gap: 5 }}  >
                                    <Form.Item
                                        style={{ flex: 1 }} 
                                        name={["contact", "phone"]}
                                        initialValue={data?.contact.phone}
                                    >
                                        <Input prefix={<MdPhone />} placeholder='Phone'/>
                                    </Form.Item>
                                    <Form.Item
                                        style={{ flex: 1 }} 
                                        name={["contact", "whatsapp"]}
                                        initialValue={data?.contact.whatsapp}
                                    >
                                        <Input prefix={<FaWhatsapp />} placeholder='WhatsApp'/>
                                    </Form.Item>
                                </Space.Compact>
                        </Form.Item>
                    </Flex>

                    {(priceLease.length>0 || (data!=null && Object.entries(data?.price).length>0)) && 
                        <Form.Item
                            style={{flex:1}}
                        >
                            <Space.Compact className='prices' style={{ flex: 1, gap: 5 }}  >
                                {(priceLease.includes("day")||data?.price?.day) &&
                                    <Form.Item
                                        style={{ flex: 1 }} 
                                        name={["price", "day"]}
                                        className='day'
                                        rules={[{ required: true, message: "Please enter price" }]}
                                        initialValue={data?.price.day}
                                    >
                                        <Input type='number' placeholder='Price'/>
                                    </Form.Item>
                                }
                                {(priceLease.includes("week")||data?.price?.week) &&
                                    <Form.Item
                                        style={{ flex: 1 }} 
                                        name={["price", "week"]}
                                        className='week'
                                        rules={[{ required: true, message: "Please enter price" }]}
                                        initialValue={data?.price?.week}
                                    >
                                        <Input type='number' placeholder='Price'/>
                                    </Form.Item>
                                }
                                {(priceLease.includes("month")||data?.price?.month) &&
                                    <Form.Item
                                        style={{ flex: 1 }} 
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
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Description"
                            name="description"
                            initialValue={data?.description}
                            rules={[{ required: true, message: "Please enter description" }]}
                            // tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                        >
                            <TextArea
                                placeholder="Enter description"
                                autoSize={{ minRows: 4}}
                            />
                        </Form.Item>
                    </Flex>

                </Flex>
                <div className='btns'>
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </div>
            </Form>
        </div>
    )
}