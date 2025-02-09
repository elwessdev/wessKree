import { memo } from 'react';
// import { LuBedSingle } from "react-icons/lu";
// import { BiBath } from "react-icons/bi";
import { PiRectangleDashedBold } from "react-icons/pi";
import { LuBedSingle, LuSofa } from "react-icons/lu";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { TbHome2 } from "react-icons/tb";
// import { BiBath } from 'react-icons/bi';
import { MdOutlineBathroom } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { TbToolsKitchen } from "react-icons/tb";



type props = {
    area: string,
    furnishing: string,
    category: string[],
    status: string,
    description: string,
    type: string,
    rooms: number,
    bedrooms: number,
    bathrooms: number,
    kitchen: number,
}

const About = ({area,furnishing,category,status,description,type,rooms,bedrooms,bathrooms,kitchen}:props) => {
    return (
        <>
            <div className="req">
                <div className="r">
                    <p>Type</p>
                    <span><TbHome2 /> {type}</span>
                </div>
                <div className="r">
                    <p>Rooms</p>
                    <span><LuBedSingle /> {rooms}</span>
                </div>
                <div className="r">
                    <p>Furnishing Status</p>
                    <span><LuSofa /> {furnishing}</span>
                </div>
                <div className="r">
                    <p>Category</p>
                    <span><MdOutlineFamilyRestroom /> {category.map((cat,idx)=>{
                        if(idx!=0){
                            return `/${cat}`;
                        } else {
                            return cat;
                        }
                    })}</span>
                </div>
                <div className="r">
                    <p>Square Area</p>
                    <span><PiRectangleDashedBold /> {area} m²</span>
                </div>
                <div className="r">
                    <p>Status</p>
                    <span><GrStatusGood /> {status}</span>
                </div>
            </div>
            <div className='rooms'>
                <div className="r">
                    <div className='dd'>
                        <span>{bedrooms}</span>
                        <p>Bedrooms</p>
                        <MdOutlineBedroomParent />
                    </div>
                </div>
                <div className="r">
                    <div className='dd'>
                        <span>{bathrooms}</span>
                        <p>Bathrooms</p>
                        <MdOutlineBathroom />
                    </div>
                </div>
                <div className="r">
                    <div className='dd'>
                        <span>{kitchen}</span>
                        <p>Kitchen</p>
                        <TbToolsKitchen />
                    </div>
                </div>
            </div>
            <div className="about">
                <h3>About Property</h3>
                <p>{description}</p>
            </div>
        </>
    )
}
export default memo(About);