import {Form, Input, Select, Flex} from 'antd';
// import { useState } from "react";
import { VscQuestion } from "react-icons/vsc";


import MapPicker from './map';

// const { TextArea } = Input;

export default function Step2(){
    const [form] = Form.useForm();

    const handleLocationSelect = (location: { lat: number; lng: number }) => {
        console.log('Selected Location:', location);
    };

    return (
        <div className="step">
            <Form
                form={form}
                layout="vertical"
                requiredMark='optional'
                >
                <Flex gap={5} vertical>
                    <Flex gap={8}>
                        <Form.Item style={{ flex: 1 }} label="State" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Select
                                showSearch
                                placeholder="Choose your state"
                                optionFilterProp="label"
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
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} label="City" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Select
                                showSearch
                                placeholder="Choose your city"
                                optionFilterProp="label"
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
                        </Form.Item>
                    </Flex>

                    <Flex gap={8}>
                        <Form.Item style={{ flex: 1 }} label="Neighborhood/Area" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Input placeholder='Enter the name of area or neighborhood' />
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} label="Zip/Postal Code" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                            <Input placeholder='Enter zip code' />
                        </Form.Item>
                    </Flex>
                    
                    <Flex gap={8}>
                        <MapPicker onLocationSelect={handleLocationSelect} />
                    </Flex>

                </Flex>
            </Form>
        </div>
    )
}