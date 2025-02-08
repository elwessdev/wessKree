import { memo, useState } from 'react';
import { Button, Modal } from 'antd';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Map
import { FaMapLocationDot } from "react-icons/fa6";

type props = {
    map: {
        lat: number,
        lng: number
    }
}

const ViewMap = ({map}:props)=>{
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <Button onClick={()=>setOpen(true)}>
                <FaMapLocationDot /> View in Google Map
            </Button>
            <Modal
                title={<p>View Property in Google Map</p>}
                open={open}
                onOk={()=>setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={false}
            >
                <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
                    <GoogleMap 
                        mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "3px", marginTop: "-10px" }} 
                        center={{lat:map?.lat,lng:map?.lng}}
                        zoom={15} 
                    >
                        <Marker 
                            position={{lat:map?.lat,lng:map?.lng}}
                        />
                    </GoogleMap>
                </LoadScript>
            </Modal>
        </>
    )
}
export default memo(ViewMap);