import "./style.scss"
import Applies from "./apply/applies";
import { Tabs } from "antd";
import Chat from "./apply/chat";
import { useState } from "react";
import Tour from "./tour/tour";

// Icons
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { RiEye2Line } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";

export default function Requests(){
    const [chatId,setChatId]=useState<string|null>(null);

    return (
        <div className="requests">
            <div className="l-s">
                <Tabs
                    defaultActiveKey="0"
                    items={[
                        {
                            key: "0",
                            label: `Applies`,
                            children: <Applies openChat={setChatId} />,
                            icon: <FaFileSignature />,
                        },
                        {
                            key: "1",
                            label: `Tour`,
                            children: <Tour openChat={setChatId} />,
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
                {/* <Applies /> */}
            </div>
            <div className="r-s">
                {/* Applies */}
                {chatId && <Chat id={chatId} />}
            </div>
        </div>
    )
}