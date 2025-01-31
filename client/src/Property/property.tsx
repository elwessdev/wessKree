import "./property.scss"

// import { TbPhotoSquareRounded } from "react-icons/tb";

import Gallery from "./gallery.tsx";
import Title from "./title.tsx";
import Details from "./details.tsx";
import Owner from "./owner.tsx";
import About from "./about.tsx";
import Apply from "./apply.tsx";


export default function Property(){
    return (
        <div id="property">
            <Title />
            <Gallery />
            <div className="btm-prt">
                <div className="details">
                    <About />
                    <Owner />
                    <div className="line"></div>
                    <Details />
                </div>
                <Apply />
            </div>
        </div>
    )
}