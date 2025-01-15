import "./property.scss"
import { LuBedSingle } from "react-icons/lu";
import { BiBath } from "react-icons/bi";
import { PiRectangleDashedBold } from "react-icons/pi";
import { Button } from 'antd';
import { Image } from 'antd';


export default function Property(){
    return (
        <div id="property">
            <div className="photos">
            {/* <Image.PreviewGroup
                items={[
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyyAOex46_9dDFriss9eUEfykai0Q5FKYgIw&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyyAOex46_9dDFriss9eUEfykai0Q5FKYgIw&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyyAOex46_9dDFriss9eUEfykai0Q5FKYgIw&s',
                ]}
            >
                <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyyAOex46_9dDFriss9eUEfykai0Q5FKYgIw&s"
                />
            </Image.PreviewGroup> */}
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
                <Button type="primary" block>Explore</Button>
            </div>
        </div>
    )
}