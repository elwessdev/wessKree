// import { useState } from 'react';
// import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Select, Space, Flex, DatePicker, Checkbox, CheckboxProps, Button } from 'antd';
import { VscQuestion } from "react-icons/vsc";
import { TbMeterSquare } from "react-icons/tb";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from 'react';

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};
// const onSearch = (value: string) => {
//     console.log('search:', value);
// };

const { TextArea } = Input;




export default function Step1(){
    const [form] = Form.useForm();
    const [addContactInfo, setAddContactInfo]=useState<boolean>(false);
    const onChangeCheck: CheckboxProps['onChange'] = (e) => {
        setAddContactInfo(e.target.checked)
    };

    const handleSubmit = () => {
        console.log(form);
    }

    return (
        <div className="step">
            <Form
                form={form}
                layout="vertical"
                requiredMark='optional'
                onFinish={handleSubmit}
                >
                <Flex gap={5} vertical>
                    <Flex>
                        <Form.Item style={{ flex: 1 }} label="Title" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Input placeholder="title of the post" />
                        </Form.Item>
                    </Flex>

                    <Flex gap={8}>
                        <Form.Item style={{ flex: 1 }} label="Type" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Select
                                placeholder="choose"
                                options={[
                                    { value: 'Apartment', label: 'Apartment' },
                                    { value: 'House', label: 'House' },
                                    { value: 'Villa', label: 'Villa' },
                                    { value: 'Office', label: 'Office', },
                                ]}
                            />
                        </Form.Item>
                        {/* <Form.Item style={{ flex: 1 }} label="Listing Type" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Select
                                placeholder="choose"
                                options={[
                                    { value: 'Rent', label: 'Rent' },
                                    { value: 'Sale', label: 'Sale' },
                                ]}
                            />
                        </Form.Item> */}
                        <Form.Item style={{ flex: 1 }} label="Category" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Select
                                placeholder="choose"
                                mode="multiple"
                                options={[
                                    { value: 'student', label: 'Student' },
                                    { value: 'Family', label: 'Family' },
                                ]}
                            />
                        </Form.Item>
                    </Flex>
                
                    {/* <Form.Item label="Price" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                        <Input placeholder="" />
                    </Form.Item> */}

                    <Flex gap={8}>
                        <Form.Item style={{ flex: 1 }} label="Square Area" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Space.Compact>
                                <Input style={{ width: '50%' }} placeholder="side" />
                                <span className='x'>X</span>
                                <Input style={{ width: '50%' }} placeholder="side" />
                                <span className='m2'><TbMeterSquare /></span>
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} label="Rooms" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Input placeholder="number of rooms" />
                        </Form.Item>
                    </Flex>

                    <Flex gap={8}>
                        <Form.Item style={{ flex: 1 }} label="Bedrooms" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Input placeholder="number of bedrooms" />
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} label="Bathrooms" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Input placeholder="number of bathrooms" />
                        </Form.Item>
                    </Flex>


                    <Flex gap={8}>
                        <Form.Item style={{ flex: 1 }} label="Kitchen" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Input placeholder="number of kitchen" />
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} label="Furnishing Status" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Select
                                placeholder="choose"
                                options={[
                                    { value: 'Furnished', label: 'Furnished' },
                                    { value: 'Semi-Furnished', label: 'Semi-Furnished' },
                                    { value: 'Unfurnished', label: 'Unfurnished' },
                                ]}
                            />
                        </Form.Item>
                    </Flex>

                    <Flex gap={8}>
                        <Form.Item style={{ flex: 1 }} label="Lease Duration" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="please select"
                                options={[
                                    { value: 'month', label: 'Month' },
                                    { value: 'week', label: 'Week' },
                                    { value: 'day', label: 'Day' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} label="Available From" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <DatePicker onChange={onChange} style={{ width: '100%' }} />
                        </Form.Item>
                    </Flex>

                    <Form.Item
                        label="Contact"
                        required
                        tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                    >
                        <Checkbox onChange={onChangeCheck}>Add contact information</Checkbox>
                        {addContactInfo && (
                            <div className='numsInfo'>
                                <Input prefix={<MdPhone />} placeholder='phone number'/>
                                <Input prefix={<FaWhatsapp />} placeholder='whatsapp number'/>
                            </div>
                        )}
                    </Form.Item>

                    <Flex gap={8}>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Description"
                            required
                            tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                        >
                            <TextArea
                                placeholder="Autosize height with minimum and maximum number of lines"
                                autoSize={{ minRows: 4}}
                            />
                        </Form.Item>
                    </Flex>

                </Flex>
                    <Button type="primary">
                        Next
                    </Button>
            </Form>
        </div>
    )
}