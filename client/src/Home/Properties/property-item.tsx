import "./style.scss"
import { Button, Tooltip, Image } from 'antd';
import { NavLink } from "react-router-dom";
import { formatDistance } from 'date-fns'
// import { Image } from 'antd';

import { FaRegHeart } from "react-icons/fa";
import { PiRectangleDashedBold } from "react-icons/pi";
import { BiBath } from "react-icons/bi";
import { LuBedSingle } from "react-icons/lu";
import { memo } from "react";

// Icons
import { MdFireplace, MdOutlineYard, MdOutlineKitchen, MdBalcony } from "react-icons/md";
import { GiHomeGarage, GiGasStove } from "react-icons/gi";
import { FaWifi, FaSwimmingPool } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { TbAirConditioning } from "react-icons/tb";
import { IoTimeOutline } from "react-icons/io5";

type props = {
    data: any
}

const featuresList = [
    { key: "wifi", label: "Internet/WiFi", icon: <FaWifi /> },
    { key: "backyard", label: "Backyard", icon: <MdOutlineYard /> },
    { key: "workspace", label: "Workspace", icon: <BsPersonWorkspace /> },
    { key: "parking", label: "Parking", icon: <AiFillSafetyCertificate /> },
    { key: "garage", label: "Garage", icon: <GiHomeGarage /> },
    { key: "airConditioner", label: "Air Conditioner", icon: <TbAirConditioning /> },
    { key: "swimmingPool", label: "Swimming Pool", icon: <FaSwimmingPool /> },
    { key: "refrigerator", label: "Refrigerator", icon: <MdOutlineKitchen /> },
    { key: "heating", label: "Heating", icon: <MdFireplace /> },
    { key: "stove", label: "Stove", icon: <GiGasStove /> },
    { key: "balcony", label: "Balcony", icon: <MdBalcony /> },
];

const  PropertyItem = ({data}:props)=>{
    return (
        <div className="property-item">
            <div className="photos">
                <Image.PreviewGroup>
                    {data?.imgs?.map((img,idx) => (
                        <Image
                            key={idx}
                            src={img?.url}
                            style={{ cursor: "pointer" }}
                        />
                    ))}
                </Image.PreviewGroup>
                
                <div className="price">
                    <p>2,600 <span>/Month</span></p>
                    <p>2,600 <span>/Week</span></p>
                    <p>2,600 <span>/Day</span></p>
                </div>
            </div>
            <div className="details">
                <h3>{data?.title}</h3>
                <p className="address">{data?.state}, {data?.city} {data?.neighborhood} {data?.zip}</p>
                <p className="date"><IoTimeOutline /> {formatDistance(new Date(data?.createdAt), new Date(), { addSuffix: true }).replace("about ", "")}</p>
                <hr />
                <div className="fr">
                    <span><LuBedSingle /> {data?.rooms} Room</span>
                    <span><BiBath /> {data?.bathrooms} Bathroom</span>
                    <span><PiRectangleDashedBold /> {data?.area.width}x{data?.area.length} m²</span>
                </div>
                <div className="features">
                    {featuresList?.filter(elm=>data?.features.includes(elm.key)).map((item)=>(
                        <Tooltip key={item?.key} title={item?.label}>
                            <p>{item?.icon}</p>
                        </Tooltip>
                    ))}
                </div>
                <hr />
                <NavLink to={`/property/${data?._id}`} className="explore">Explore</NavLink>
                <Button className="favorite"><FaRegHeart /></Button>
            </div>
        </div>
    )
}

export default memo(PropertyItem);