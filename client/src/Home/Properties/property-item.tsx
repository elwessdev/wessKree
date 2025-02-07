import "./style.scss"
import { Button, Tooltip, Image, message } from 'antd';
import { NavLink } from "react-router-dom";
import { formatDistance } from 'date-fns'
import { featuresList } from "../../Data/features";
import { memo } from "react";
import { useUser } from "../../context/userContext";
import { addFavorite } from "../../API/property";

// Icons
import { FaRegHeart } from "react-icons/fa";
import { PiRectangleDashedBold } from "react-icons/pi";
import { BiBath } from "react-icons/bi";
import { LuBedSingle } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";


type props = {
    data: any
}

const PropertyItem = ({data}:props)=>{
    const {user} = useUser();

    // Add favorite
    const addToFavorite = async() => {
        const res = await addFavorite(data?._id);
        if(res?.data.exist){
            message.success("Already in my favorite");
            return;
        }
        if(res?.data.success){
            message.success("The property added to favorite");
        } else {
            message.error("Something error, Try again");
        }
    }

    return (
        <div className="property-item">
            <div className="photos">
                <Image.PreviewGroup>
                    {data?.imgs.map((img:any,idx:number) => (
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
                {user?.email 
                    ?(
                        <Tooltip placement="top" title={"Add to favorite"} arrow={true}>
                            <Button onClick={addToFavorite} className="favorite"><FaRegHeart /></Button>
                        </Tooltip>
                    )
                    :(
                        <Tooltip placement="top" title={"Please login first"} arrow={true}>
                            <Button className="favorite"><FaRegHeart /></Button>
                        </Tooltip>
                    )
                }
            </div>
        </div>
    )
}

export default memo(PropertyItem);