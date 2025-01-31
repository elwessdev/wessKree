import { memo } from 'react';

import { FaWifi } from "react-icons/fa";
import { MdOutlineYard } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdFireplace } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiHomeGarage } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { FaSwimmingPool } from "react-icons/fa";
import { MdOutlineKitchen } from "react-icons/md";
import { GiGasStove } from "react-icons/gi";
import { MdBalcony } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Details = () => {
    return (
        <div className="feature">
            <h3>Rental features</h3>
            <div className="items">
                <div className="f">
                    <div className="icon"><FaWifi /></div>
                    <p>Wifi</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><MdOutlineYard /></div>
                    <p>Backyard</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><BsPersonWorkspace /></div>
                    <p>Workspace</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><AiFillSafetyCertificate /></div>
                    <p>Parking</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><GiHomeGarage /></div>
                    <p>Garage</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><TbAirConditioning /></div>
                    <p>Air Conditioner</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><FaSwimmingPool /></div>
                    <p>Swimmingpool</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><MdOutlineKitchen /></div>
                    <p>Refrigerateur</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><MdFireplace /></div>
                    <p>Heating</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><GiGasStove /></div>
                    <p>Stove</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
                <div className="f">
                    <div className="icon"><MdBalcony /></div>
                    <p>Balcony</p>
                    <div className="ok">
                        <IoIosCheckmarkCircle />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(Details);