import { memo } from 'react';
// import { LuBedSingle } from "react-icons/lu";
// import { BiBath } from "react-icons/bi";
import { PiRectangleDashedBold } from "react-icons/pi";
import { LuSofa } from "react-icons/lu";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineFamilyRestroom } from "react-icons/md";

type props = {
    area: string,
    furnishing: string,
    category: string[],
    status: string,
    description: string
}

const About = ({area,furnishing,category,status,description}:props) => {
    return (
        <>
            <div className="req">
                {/* <div className="r">
                    <p>Rooms</p>
                    <span><LuBedSingle /> 4</span>
                </div>
                <div className="r">
                    <p>Bathrooms</p>
                    <span><BiBath /> 4</span>
                </div> */}
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
        <div className="about">
            <h3>About this property</h3>
            <p>{description}</p>
        </div>
        </>
    )
}
export default memo(About);