import "./style.scss"
import Applies from "./apply/applies";
import { Tabs } from "antd";
import Chat from "./apply/chat";
import { useState } from "react";
import Tour from "./tour/tour";
import CovImg from "../assets/3dill.webp"

// Icons
// import { BsFillPatchQuestionFill } from "react-icons/bs";
import { RiEye2Line } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";

export default function Requests(){
    const [chatId,setChatId]=useState<string|null>(null);

    return (
        <div className="requests">
            {/* <Splitter style={{ width: "100%", height: "100%", boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Splitter.Panel defaultSize="25%" min="20%" max="50%"> */}
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
                                // {
                                //     key: "2",
                                //     label: `Questions`,
                                //     // children: <Questions />,
                                //     icon: <BsFillPatchQuestionFill />,
                                // },
                            ]}
                        />
                        {/* <Applies /> */}
                    </div>
                {/* </Splitter.Panel>
                <Splitter.Panel defaultSize="70%" min="50%" max="70%"> */}
                    <div className="r-s">
                        {/* Applies */}
                        {chatId&& <Chat id={chatId} />}
                        {!chatId && <img className="cov" src={CovImg} />}
                    </div>
                {/* </Splitter.Panel>
            </Splitter> */}
        </div>
    )
}