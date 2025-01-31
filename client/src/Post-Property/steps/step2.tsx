import {Form, Input, Select, Flex, Button} from 'antd';
import { useEffect, useState } from 'react';
import MapPicker from './map';
import {StateCity} from "../../Data/state-municipality.ts";
// import { VscQuestion } from "react-icons/vsc";

// Type
type props = {
    next: () => void,
    prev: () => void,
    data: values | null,
    setData: (par:values) => void,
}
interface values {
    city: string | undefined,
    neighborhood: string | undefined,
    state: string | undefined,
    zip: string | undefined
}
type stateCityType = { value: string; label: string }[];


// Functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


export default function Step2({data,setData,next,prev}:props){
    const [form] = Form.useForm();
    const [delegations, setDelegations] = useState<stateCityType>([]);
    // const [delegationValue, setDelegationValue] = useState<string|null>(null);

    const stateOptions = StateCity.map(state => ({
        value: capitalize(state.Name),
        label: capitalize(state.Name),
    }));
    
    const handleStateChange = (value:string|undefined) => {
        // setDelegationValue(null);
        const state = StateCity.find((s) => capitalize(s.Name) === value);
        setDelegations(state ?state.Delegations.map((d) => ({ value: capitalize(d.Value), label: capitalize(d.Name) })) :[]);
    };

    useEffect(()=>handleStateChange(data?.state),[data])

    const handleLocationSelect = (location: { lat: number; lng: number }) => {
        console.log('Selected Location:', location);
    };

    const handleSubmit = (values:values) => {
        setData(values);
        // console.log("Step 2 data from child", values);
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
                    <Flex gap={15}>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="State"
                            name="state"
                            rules={[{ required: true, message: "Please choose state" }]}
                            initialValue={data?.state}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Search..."
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={handleStateChange}
                                options={stateOptions}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="City"
                            name="city"
                            rules={[{ required: true, message: "Please choose city" }]}
                            initialValue={data?.city}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Search..."
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={delegations}
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
                            initialValue={data?.zip}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input type='number' placeholder='Enter zip code' />
                        </Form.Item>
                        <Form.Item 
                            style={{ flex: 1 }}
                            label="Neighborhood/Area"
                            name="neighborhood"
                            initialValue={data?.neighborhood}
                            // tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <Input placeholder='Enter the name of area or neighborhood' />
                        </Form.Item>
                    </Flex>
                    <Flex gap={15}>
                        <MapPicker onLocationSelect={handleLocationSelect} />
                    </Flex>
                </Flex>
                <div className='btns'>
                    <Button type="primary" onClick={prev}>
                        Previous
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </div>
            </Form>
        </div>
    )
}