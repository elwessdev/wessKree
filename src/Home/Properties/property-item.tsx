import "./property.scss"
import { Button } from 'antd';
import { NavLink } from "react-router-dom";
// import { Image } from 'antd';

import { FaRegHeart } from "react-icons/fa";
import { PiRectangleDashedBold } from "react-icons/pi";
import { BiBath } from "react-icons/bi";
import { LuBedSingle } from "react-icons/lu";

export default function PropertyItem(){
    return (
        <div className="property-item">
            <div className="photos">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyyAOex46_9dDFriss9eUEfykai0Q5FKYgIw&s" />
            </div>
            <div className="details">
                <div className="price">
                    <p>2,600</p>
                    <span>/Month</span>
                </div>
                <h3>Name of house</h3>
                <p className="address">Douz, Kebili rue 2655</p>
                <hr />
                <div className="fr">
                    <span><LuBedSingle /> 4 Rooms</span>
                    <span><BiBath /> 4 Bathrooms</span>
                    <span><PiRectangleDashedBold /> 2x7.5 m2</span>
                </div>
                <hr />
                <NavLink to={"/property"} className="explore">Explore</NavLink>
                <Button className="favorite"><FaRegHeart /></Button>
            </div>
        </div>
    )
}