// import { useState } from 'react';
// import { InfoCircleOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Select, CheckboxProps } from 'antd';
import { VscQuestion } from "react-icons/vsc";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};
const onSearch = (value: string) => {
    console.log('search:', value);
};

const { TextArea } = Input;

const onChangeCheck: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};


export default function Step1(){
    const [form] = Form.useForm();

    return (
        <div className="step">
            <Form
                form={form}
                layout="vertical"
                requiredMark='optional'
                >
                <Form.Item label="Property title" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    label="Adresse"
                    required
                    className='adresse'
                    tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                >
                    <Select
                        showSearch
                        placeholder="state"
                        optionFilterProp="label"
                        onChange={onChange}
                        onSearch={onSearch}
                        options={[
                        {
                            value: 'jack',
                            label: 'Jack',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                        {
                            value: 'tom',
                            label: 'Tom',
                        },
                        ]}
                    />
                    <Select
                        showSearch
                        placeholder="city"
                        optionFilterProp="label"
                        onChange={onChange}
                        onSearch={onSearch}
                        options={[
                        {
                            value: 'jack',
                            label: 'Jack',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                        {
                            value: 'tom',
                            label: 'Tom',
                        },
                        ]}
                    />
                    <Input placeholder="more" />
                </Form.Item>
                <Form.Item
                    label="Contact"
                    required
                    tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                >
                    <Checkbox onChange={onChangeCheck}>Add contact information</Checkbox>
                    <div className='numsInfo'>
                        <Input addonBefore={<FaPhoneSquareAlt />} placeholder='Phone number' disabled/>
                        <Input addonBefore={<FaWhatsappSquare />} placeholder='WhatsApp number' disabled/>
                    </div>
                </Form.Item>
                <Form.Item
                    label="Description"
                    required
                    tooltip={{ title: 'Tooltip with customize icon', icon: <VscQuestion /> }}
                >
                    <TextArea
                        placeholder="Autosize height with minimum and maximum number of lines"
                        autoSize={{ minRows: 4}}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}