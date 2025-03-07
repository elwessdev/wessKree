import "./style.scss";
import { Form, Input, Select, Space, Flex, InputNumber, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';
import { TbMeterSquare } from 'react-icons/tb';



export default function EditProperty() {
    const [form] = Form.useForm();
    const [priceLease, setPriceLease] = useState<string[]>([])

    const handlePrice = (values:string[]) => {
        setPriceLease(values);
        // if(data?.price){
        //     const newPriceList = Object.keys(data?.price).filter(key => !values.includes(key));
        //     newPriceList.forEach(key => delete data?.price[key]);
        // }
    }

    const handleSubmit = (values: any) => {
        console.log(values);
    }

    return (
        <div className="editPropertyModel">
            <Form
                form={form}
                layout="vertical"
                requiredMark='optional'
                onFinish={handleSubmit}
                >
                <Flex gap={15} vertical>
                    <Flex gap={15}>
                        <Form.Item
                            style={{ flex: 1 }} 
                            label="Title" 
                            name="title"
                            rules={[{ required: true, message: "Please enter rent title" }]}
                            // initialValue={data?.title}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input placeholder="Enter title" />
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }} 
                            label="Type" 
                            name="type"
                            rules={[{ required: true, message: "Please choose type" }]}
                            // initialValue={data?.type}
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
                            // initialValue={data?.category}
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
                                    // initialValue={data?.area.width}
                                >
                                    <InputNumber type='number' placeholder="Width" />
                                </Form.Item>
                                <span className='x' style={{margin: "0 5px", position: "relative", top: "5px"}}>X</span>
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    name={["area","length"]}
                                    rules={[{ required: true, message: "Please enter length" }]}
                                    // initialValue={data?.area.length}
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
                            // initialValue={data?.rooms}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type="number" placeholder="Number of rooms" />
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }} 
                            label="Bedrooms" 
                            name="bedrooms"
                            rules={[{ required: true, message: "Please enter number of bedrooms" }]}
                            // initialValue={data?.bedrooms}
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
                            // initialValue={data?.bathrooms}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type="number" placeholder="Number of bathrooms" />
                        </Form.Item>
                        <Form.Item 
                            style={{ flex: 1 }} 
                            label="Kitchen" 
                            name="kitchen"
                            rules={[{ required: true, message: "Please enter number of kitchen" }]}
                            // initialValue={data?.kitchen}
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
                            // initialValue={data?.furnishingStatus}
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
                            // initialValue={data?.leaseDuration}
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

                    {/* <Flex gap={15}> */}
                        {/* <Form.Item 
                            style={{ flex: 1 }} 
                            label="Available From" 
                            required 
                            tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <DatePicker onChange={onChange} style={{ width: '100%' }} />
                        </Form.Item> */}
                        <Form.Item
                            // style={{ flex: 1 }} 
                            label="Contact"
                            // tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                            >
                                <Space.Compact className='con' style={{ flex: 1, gap: 5 }}  >
                                    <Form.Item
                                        style={{ flex: 1 }} 
                                        name={["contact", "phone"]}
                                        // initialValue={data?.contact.phone}
                                    >
                                        <Input prefix={<MdPhone />} placeholder='Phone'/>
                                    </Form.Item>
                                    <Form.Item
                                        style={{ flex: 1 }} 
                                        name={["contact", "whatsapp"]}
                                        // initialValue={data?.contact.whatsapp}
                                    >
                                        <Input prefix={<FaWhatsapp />} placeholder='WhatsApp'/>
                                    </Form.Item>
                                </Space.Compact>
                        </Form.Item>
                    {/* </Flex> */}

                    {/* {(priceLease.length>0 || (data!=null && Object.entries(data?.price).length>0)) && 
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
                    } */}

                    <Flex gap={15}>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Description"
                            name="description"
                            // initialValue={data?.description}
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
            </Form>
        </div>
    )
} 