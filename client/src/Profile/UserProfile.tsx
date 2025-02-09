import "./style.scss"
import { Button, message, Modal, Spin, Tooltip } from 'antd';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import PropertyItem from "../Home/Properties/property-item";
// import { Tabs } from 'antd';
import { useQuery } from "@tanstack/react-query";
import { getUserInfos, userProperties } from "../API/user";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";


// Icons
import { MdContentCopy, MdOutlineLocationOn, MdNotificationsActive } from "react-icons/md";
import { TbHomeQuestion } from "react-icons/tb";
import { FaSquareWhatsapp, FaSquarePhone } from "react-icons/fa6";
import { useParams } from "react-router-dom";

type params = Record<string, string | undefined>;

export default function UserProfile(){
    const {userNameUrl}:any = useParams<params>();

    const [open, setOpen] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");

    const {data:userInfo,isLoading:infoLoading,error:infoError} = useQuery({
        queryFn: () => getUserInfos(userNameUrl),
        queryKey: ["userInfos",[userNameUrl]],
        refetchOnWindowFocus: true
        // staleTime: Infinity
    })

    const {data:properties,isLoading:propertiesLoading,error:propertiesError} = useQuery({
        queryFn: () => userProperties(userNameUrl),
        queryKey: ["properties",[userNameUrl]],
        refetchOnWindowFocus: true
        // staleTime: Infinity
    })

    console.log(userInfo);
    console.log(properties);

    const handleQuestion = ()=>{
        message.success("Message sent")
    }


    return (
        <div id="profile">
            <div className="l-s">
                {infoLoading && (
                    <Spin size="large" />
                )}
                {infoError && <h1>Something wrong, Refresh page</h1>}
                {userInfo && (
                    <>
                        <img src={userInfo?.photo} />
                        <h3>{userInfo?.username}</h3>
                        <p><MdOutlineLocationOn /> {userInfo?.state}, {userInfo?.city}</p>
                        <div className="contact">
                            {userInfo?.contact && (
                                <>
                                    <p>
                                        <FaSquarePhone />
                                        <span>226589652</span>
                                        <MdContentCopy className="copy" />
                                    </p>
                                    <p>
                                        <FaSquareWhatsapp />
                                        <span>226589652</span>
                                        <MdContentCopy className="copy" />
                                    </p>
                                </>
                            )}
                            <Button className="ask" onClick={()=>setOpen(true)}><TbHomeQuestion /> Ask a question</Button>
                        </div>
                        <Tooltip placement="top" title={"Stay up to date"}>
                            <Button className="notif"><MdNotificationsActive /></Button>
                        </Tooltip>
                    </>
                )}
            </div>
            <div className="r-s">
                {propertiesLoading && (
                    <Spin size="large" />
                )}
                {propertiesError && <h1>Something wrong, Refresh page</h1>}
                {properties && (
                    properties.map((property:any,idx:number)=>(<PropertyItem data={property} key={idx} />))
                )}
            </div>
            <Modal
                open={open}
                title={`Ask a Question`}
                // onOk={handleQuestion}
                onCancel={()=>setOpen(false)}
                footer={() => (
                    <>
                        <Button onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button type="primary" onClick={handleQuestion}>Sent</Button>
                    </>
                )}
            >
                <TextArea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Write the Question here..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
            </Modal>
        </div>
    )
}