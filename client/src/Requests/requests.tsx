import "./style.scss"
// import { Button, Input, Space, Tabs } from "antd"
// import { FaRegFileLines } from "react-icons/fa6";
// import { IoSendSharp } from "react-icons/io5";
// import { MdOutlineLocationOn } from "react-icons/md";
// import { TbHomeQuestion } from "react-icons/tb";
// import { FaHandPointRight } from "react-icons/fa";
// import { BsFillPatchQuestionFill } from "react-icons/bs";
// import Questions from "./components/questions";
import Applies from "./components/applies";
import { Tabs } from "antd";
// import { RiEye2Line } from "react-icons/ri";
// import { FaFileSignature } from "react-icons/fa";
// import { IoSendSharp } from "react-icons/io5";
// import { TbHomeQuestion } from "react-icons/tb";
import Chat from "./components/chat";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { RiEye2Line } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";



export default function Requests(){
    return (
        <div className="requests">
            <div className="l-s">
                <Tabs
                    defaultActiveKey="0"
                    items={[
                        {
                            key: "0",
                            label: `Applies`,
                            children: <Applies />,
                            icon: <FaFileSignature />,
                        },
                        {
                            key: "1",
                            label: `Tour`,
                            // children: <Questions />,
                            icon: <RiEye2Line />,
                        },
                        {
                            key: "2",
                            label: `Questions`,
                            // children: <Questions />,
                            icon: <BsFillPatchQuestionFill />,
                        },
                    ]}
                />
                <Applies />
            </div>
            <div className="r-s">
                {/* Applies */}
                <Chat />
            </div>
        </div>
    )
}