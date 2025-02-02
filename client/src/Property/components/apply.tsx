import { useState, memo } from "react";
import { Button, DatePicker } from "antd"

import { FaRegFileLines } from "react-icons/fa6";
import { BiHomeAlt } from "react-icons/bi";
import { TbBrandYoutube } from "react-icons/tb";
import { TbHomeHand } from "react-icons/tb";

const Apply = () => {
    const [chooseTour, setChooseTour]=useState<string | null>(null);

    const handleChooseTour = (type: string) => {
        setChooseTour(type);
    }

    return (
        <div className="apply">
            <div className="price">
                <h3>Rent Price</h3>
                <p>2,600<b>DT</b> <span>/Month</span></p>
            </div>
            <Button>
                <FaRegFileLines /> Apply now
            </Button>
            <div className="line"></div>
            <div className="tour">
                <h3>Request a home tour</h3>
                <div className="options">
                    <Button 
                        className={chooseTour === "inPerson" ?"active" :""}
                        onClick={()=>handleChooseTour("inPerson")}
                    >
                        <BiHomeAlt /> In Person
                    </Button>
                    <Button 
                        className={chooseTour === "virtual" ?"active" :""}
                        onClick={()=>handleChooseTour("virtual")}
                    >
                        <TbBrandYoutube /> Virtual
                    </Button>
                </div>
                <DatePicker placeholder="Select tour date" />
                <Button>
                    <TbHomeHand /> Request a tour
                </Button>
            </div>
        </div>
    )
}
export default memo(Apply);