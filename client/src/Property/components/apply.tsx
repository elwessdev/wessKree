import { useState, memo } from "react";
import { Button, DatePicker } from "antd"

import { FaRegFileLines } from "react-icons/fa6";
import { BiHomeAlt } from "react-icons/bi";
import { TbBrandYoutube } from "react-icons/tb";
import { TbHomeHand } from "react-icons/tb";

type props = {
    price: any
}

const Apply = ({price}:props) => {
    const [chooseTour, setChooseTour]=useState<string | null>(null);
    const [selectedPrice, setSelectedPrice]=useState<string|null>(null);

    const handleChooseTour = (type: string) => {
        setChooseTour(type);
    }

    const handleSelectPrice = (p:string) => {
        setSelectedPrice(p)
    }

    return (
        <div className="apply">
            <div className="price">
                <h3>Rent Price</h3>
                {price.length>1
                    ?(
                        <div className="many">
                            {price && Object.entries(price).map((p:any,idx:number)=>(
                                <p
                                    key={idx}
                                    className={`nrml ${selectedPrice==p[0] ?"active" :""}`}
                                    onClick={()=>handleSelectPrice(p[0])}
                                >
                                    {p[1]}
                                    <b>DT</b>
                                    <span>/{p[0]}</span>
                                </p>
                            ))}
                        </div>
                    )
                    :(
                        <p className="nrml">{price[0][1]}<b>DT</b> <span>/{price[0][0]}</span></p>
                    )
                }
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