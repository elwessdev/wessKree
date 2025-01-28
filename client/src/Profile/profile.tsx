import "./profile.scss"
import { Button, Tooltip } from 'antd';

import { MdOutlineLocationOn } from "react-icons/md";
import { TbHomeQuestion } from "react-icons/tb";
import PropertyItem from "../Home/Properties/property-item";
import { MdNotificationsActive } from "react-icons/md";


export default function Profile(){
    return (
        <div id="profile">
            <div className="l-s">
                <img src="https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-05.jpg" />
                <h3>Osama Test</h3>
                <p><MdOutlineLocationOn /> Kebili, Douz</p>
                <Button className="ask"><TbHomeQuestion /> Ask a question</Button>
                <Tooltip placement="top" title={"Stay up to date"}>
                    <Button className="notif"><MdNotificationsActive /></Button>
                </Tooltip>
            </div>
            <div className="r-s">
                {new Array(4).fill(0).map((_,idx)=>(<PropertyItem key={idx} />))}
            </div>
        </div>
    )
}