// import { useState } from 'react';
// import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Select, Space, Flex, InputNumber, Button } from 'antd';
// import { VscQuestion } from "react-icons/vsc";

// Icons
import { TbMeterSquare } from "react-icons/tb";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from 'react';

const { TextArea } = Input;

// Type
type props = {
    next: () => void,
}
interface values {
    title: string,
    type: string,
    category: string[],
    area:{
        width: number,
        length: number
    }
    rooms: string,
    bathrooms: string,
    bedrooms: string,
    kitchen: string,
    furnishingStatus: string,
    leaseDuration: string[],
    contact:{
        phone: string,
        whatsapp: string | undefined
    }
    description: string,
}


export default function Step1({next}:props){
    const [form] = Form.useForm();
    const [setpOneData, setStepOneData] = useState<values|null>(null);
    
    const handleSubmit = (values:values) => {
        console.log("Step one data:", values);
        setStepOneData(values);
        next();
    }

    return (
        <div className="step">
            <Form
                form={form}
                layout="vertical"
                requiredMark='optional'
                onFinish={handleSubmit}
                >
                <Flex gap={18} vertical>
                    <Flex>
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
                            label="Type" 
                            name="type"
                            rules={[{ required: true, message: "Please choose type" }]}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Select
                                placeholder="Choose type"
                                options={[
                                    { value: 'Apartment', label: 'Apartment' },
                                    { value: 'House', label: 'House' },
                                    { value: 'Villa', label: 'Villa' },
                                    // { value: 'Office', label: 'Office', },
                                ]}
                            />
                        </Form.Item>
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
                                    { value: 'Family', label: 'Family' },
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
                                >
                                    <InputNumber placeholder="Enter width" />
                                </Form.Item>
                                <span className='x'>X</span>
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    name={["area","length"]}
                                    rules={[{ required: true, message: "Please enter length" }]}
                                >
                                    <InputNumber placeholder="Enter length" />
                                </Form.Item>
                                <span className='m2'><TbMeterSquare /></span>
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }} 
                            label="Rooms" 
                            name="rooms"
                            rules={[{ required: true, message: "Please enter number of rooms" }]}
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
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type="number" placeholder="Number of bedrooms" />
                        </Form.Item>
                        <Form.Item 
                            style={{ flex: 1 }} 
                            label="Bathrooms" 
                            name="bathrooms"
                            rules={[{ required: true, message: "Please enter number of bathrooms" }]}
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
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type="number" placeholder="Number of kitchen" />
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
                                    { value: 'Furnished', label: 'Furnished' },
                                    { value: 'Semi-Furnished', label: 'Semi-Furnished' },
                                    { value: 'Unfurnished', label: 'Unfurnished' },
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
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="please select"
                                showSearch={false}
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
                        </Form.Item>
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