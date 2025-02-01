import Filter from "../Filter/filter"
import PropertyItem from "./property-item"
import "./properties.scss"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Properties(){
    const [properties, setProperties] = useState(null);
    useEffect(()=>{
        const getProperties = async()=>{
            try {
                const res = await axios.get("/api/property");
                setProperties(res?.data.properties);
                console.log(res?.data.properties);
            } catch(err) {
                console.log("get properties",err);
            }
        }
        getProperties();
    },[]);
    return (
        <div id="properties">
            <Filter />
            <div className="items">
                {properties?.map((property,idx)=>(<PropertyItem key={idx} data={property} />))}
            </div>
        </div>
    )
}