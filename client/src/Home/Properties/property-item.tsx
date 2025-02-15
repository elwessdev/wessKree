import "./style.scss"
import { Button, Tooltip, Image, message, Popconfirm } from 'antd';
import { NavLink } from "react-router-dom";
import { formatDistance } from 'date-fns'
import { featuresList } from "../../Data/features";
import { memo } from "react";
import { useUser } from "../../hooks/userContext";
import { addFavorite } from "../../API/property";

// Icons
import { FaRegHeart } from "react-icons/fa";
import { PiRectangleDashedBold } from "react-icons/pi";
import { LuBedSingle } from "react-icons/lu";
import { BiBath } from "react-icons/bi";
import { IoTimeOutline } from "react-icons/io5";
import { IoHeartDislike } from "react-icons/io5";


type props = {
    data: any,
    page?:string,
    delFavBtn?:any
}

const PropertyItem = ({data,page,delFavBtn}:props)=>{
    const {user} = useUser();

    // Add favorite
    const addToFavorite = async() => {
        const res = await addFavorite(data?._id);
        if(res?.myProperty){
            message.error("Can't added, It's my property");
            return;
        }
        if(res?.exist){
            message.success("Already in my favorite");
            return;
        }
        if(res?.success){
            message.success("The property added to favorite");
        } else {
            message.error("Something error, Try again");
        }
    }

    const editProperty = () => {
        console.log("editProperty");
    }
    const deleteProperty = () => {
        console.log("deleteProperty");
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
                    {data?.price && Object.entries(data?.price).map((p:any,idx:number)=>(
                        <p key={idx}>{p[1]} <span>/{p[0]}</span></p>
                    ))}
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
                <div className="btns">
                    <NavLink to={`/property/${data?._id}`} className="explore">Explore</NavLink>
                    {page=="owner"&&(
                        <>
                            <Button color="primary" variant="dashed" onClick={editProperty} className="ed">Edit</Button>
                            <Popconfirm
                            title="Delete Property ?"
                            description="Are you sure to delete this property?"
                            onConfirm={deleteProperty}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button color="danger" variant="dashed" danger className="ed">Delete</Button>
                        </Popconfirm>
                        </>
                    )}
                </div>
                {user != null && page !== "owner" ? (
                    page == "ownerFav" ? (
                        <Popconfirm
                            title="Remove from Favorites?"
                            description="Are you sure to unfavorite this property ?"
                            onConfirm={()=>delFavBtn(data?._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            {/* <Tooltip placement="top" title={"Unfavorite"} arrow={true}> */}
                                <Button className="favorite"><IoHeartDislike /></Button>
                            {/* </Tooltip> */}
                        </Popconfirm>
                    ) : (
                        <Tooltip placement="top" title={"Add to Favorite"} arrow={true}>
                            <Button onClick={addToFavorite} className="favorite"><FaRegHeart /></Button>
                        </Tooltip>
                    )
                ) : user == null && page !== "owner" ? (
                    <Tooltip placement="top" title={"Please login first"} arrow={true}>
                        <Button className="favorite"><FaRegHeart /></Button>
                    </Tooltip>
                ) : null}
            </div>
        </div>
    )
}

export default memo(PropertyItem);