import {Form, Input, Select, Flex, Button} from 'antd';
import { useEffect, useState } from 'react';
// import MapPicker from './map';
import {StateCity} from "../../Data/stateCity.ts";
// import { VscQuestion } from "react-icons/vsc";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Type
type props = {
    next: () => void,
    prev: () => void,
    data: values | any,
    setData: (par:values) => void,
}
interface values {
    city: string | undefined,
    neighborhood: string | undefined,
    state: string | undefined,
    zip: number | undefined,
    lat?: number,
    lng?: number
}
type stateCityType = { value: string; label: string }[];


// Functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const stateCoordinates: Record<string, { lat: number; lng: number }> = {
    "Ariana": { lat: 36.8665, lng: 10.1647 },
    "Beja": { lat: 36.7333, lng: 9.1833 },
    "Ben arous": { lat: 36.7531, lng: 10.2189 },
    "Bizerte": { lat: 37.2744, lng: 9.8739 },
    "Gabes": { lat: 33.8815, lng: 10.0982 },
    "Gafsa": { lat: 34.4250, lng: 8.7842 },
    "Jendouba": { lat: 36.5011, lng: 8.7802 },
    "Kairouan": { lat: 35.6781, lng: 10.0963 },
    "Kasserine": { lat: 35.1671, lng: 8.8365 },
    "Kebili": { lat: 33.7050, lng: 8.9690 },
    "Kef": { lat: 36.1742, lng: 8.7049 },
    "Mahdia": { lat: 35.5047, lng: 11.0622 },
    "Manouba": { lat: 36.8089, lng: 10.1010 },
    "Medenine": { lat: 33.3526, lng: 10.5055 },
    "Monastir": { lat: 35.7643, lng: 10.8113 },
    "Nabeul": { lat: 36.4510, lng: 10.7360 },
    "Sfax": { lat: 34.7390, lng: 10.7603 },
    "Sidi bouzid": { lat: 35.0382, lng: 9.4858 },
    "Siliana": { lat: 36.0833, lng: 9.3667 },
    "Sousse": { lat: 35.8256, lng: 10.6360 },
    "Tataouine": { lat: 32.9297, lng: 10.4518 },
    "Tozeur": { lat: 33.9206, lng: 8.1339 },
    "Tunis": { lat: 36.8065, lng: 10.1815 },
    "Zaghouan": { lat: 36.4029, lng: 10.1423 }
};


export default function Step2({data,setData,next,prev}:props){
    const [form] = Form.useForm();
    const [delegations, setDelegations] = useState<stateCityType>([]);
    // const [delegationValue, setDelegationValue] = useState<string|null>(null);
    const [position, setPosition] = useState<{ lat: number; lng: number }>({
        lat:36.8065,
        lng:10.1815,
    });

    const stateOptions = StateCity.map(state => ({
        value: capitalize(state.Name),
        label: capitalize(state.Name),
    }));
    
    const handleStateChange = (value:string|undefined) => {
        if(!value) return;
        // setDelegationValue(null);
        const state = StateCity.find((s) => capitalize(s.Name) === value);
        setDelegations(state ?state.Delegations.map((d) => ({ value: capitalize(d.Value), label: capitalize(d.Name) })) :[]);
        if (stateCoordinates[value]) {
            setPosition(stateCoordinates[value]);
        }
    };

    useEffect(()=>handleStateChange(data?.state),[data]);

    useEffect(()=>{
        if(data?.lat && data?.lng){
            setPosition({
                lat: data?.lat,
                lng: data?.lng
            })
        }
    },[])

    const handleSubmit = (values:values) => {
        setData({...values, zip: Number(values.zip),lat:position.lat, lng:position.lng});
        // console.log(position);
        // console.log("Step 2 data from child", values);
        next();
    }

    const handleMarkerDrag = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setPosition({ lat, lng });
            // console.log("lat",lat);
            // console.log("lng",lng);
            // setData({...data, lat: lat, lng: lng})
        }
    };
    
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
                    <Flex gap={15} wrap>
                        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
                            <GoogleMap mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "3px", marginTop: "-10px" }} center={position} zoom={10} onClick={handleMarkerDrag}>
                                <Marker position={position} draggable={true} onDragEnd={handleMarkerDrag} />
                            </GoogleMap>
                        </LoadScript>
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