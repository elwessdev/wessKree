import { memo } from 'react';
import { LuBedSingle } from "react-icons/lu";
import { BiBath } from "react-icons/bi";
import { PiRectangleDashedBold } from "react-icons/pi";
import { GrStatusGood } from "react-icons/gr";

const About = () => {
    return (
        <>
            <div className="req">
                <div className="r">
                    <p>Rooms</p>
                    <span><LuBedSingle /> 4</span>
                </div>
                <div className="r">
                    <p>Bathrooms</p>
                    <span><BiBath /> 4</span>
                </div>
                <div className="r">
                    <p>Square Area</p>
                    <span><PiRectangleDashedBold /> 6x8.5 m²</span>
                </div>
                <div className="r">
                    <p>Square Area</p>
                    <span><PiRectangleDashedBold /> 6x8.5 m²</span>
                </div>
                <div className="r">
                    <p>Status</p>
                    <span><GrStatusGood /> Active</span>
                </div>
        </div>
        <div className="about">
            <h3>About this home</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero porro vel aliquam inventore minus neque eum, mollitia veritatis eius officia earum sunt temporibus commodi dolorem, dolores ex, incidunt expedita? Nemo vero porro vel aliquam inventore minus neque eum, mollitia veritatis eius officia earum sunt temporibus commodi dolorem, dolores ex, incidunt expedita?
            Nemo vero porro vel aliquam inventore minus neque eum, mollitia veritatis eius officia earum sunt temporibus commodi dolorem, dolores ex, incidunt expedita?
            </p>
        </div>
        </>
    )
}
export default memo(About);