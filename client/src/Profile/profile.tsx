import "./style.scss"
import { Button, message, Modal, Spin, Tabs, Tooltip } from 'antd';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import PropertyItem from "../Home/Properties/property-item";
// import { Tabs } from 'antd';
import { useQuery } from "@tanstack/react-query";
import { getUserInfos, getMyInfo } from "../API/user";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";


// Icons
import { MdSettings, MdContentCopy, MdOutlineLocationOn, MdNotificationsActive, MdMapsHomeWork, MdFavorite } from "react-icons/md";
import { TbHomeStats, TbHomeQuestion } from "react-icons/tb";
import { FaSquareWhatsapp, FaSquarePhone } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";

type params = Record<string, string | undefined>;

export default function Profile(){
    const {userNameUrl} = useParams<params>();
    console.log(userNameUrl);
    const [open, setOpen] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");

    const {data,isLoading,error} = useQuery({
        queryFn: () => {
            console.log(userNameUrl);
            if(userNameUrl==="my-profile"){
                return getMyInfo();
            }
            if(userNameUrl && userNameUrl!="my-profile"){
                return getUserInfos(userNameUrl);
            }
        },
        queryKey: ["userProperty"],
        refetchOnWindowFocus: true
        // staleTime: Infinity
    })

    console.log(data);

    const handleQuestion = ()=>{
        message.success("Message sent")
    }


    return (
        <div id="profile">
            {isLoading && (
                <Spin size="large" />
            )}
            {error && <h1>There is an error to load items</h1>}
            {data && (
                <>
                    <div className="l-s">
                        <img src={data?.userInfo?.photo} />
                        <h3>{data?.userInfo?.username}</h3>
                        <p><MdOutlineLocationOn /> {data?.userInfo?.state}, {data?.userInfo?.city}</p>
                        <div className="contact">
                            <p>
                                <FaSquarePhone />
                                <span>226589652</span>
                                {userNameUrl!="my-profile" ?(
                                    <MdContentCopy className="copy" />
                                ) :(
                                    <RiEdit2Fill className="copy" />
                                )}
                            </p>
                            <p>
                                <FaSquareWhatsapp />
                                <span>226589652</span>
                                {userNameUrl!="my-profile" ?(
                                    <MdContentCopy className="copy" />
                                ) :(
                                    <RiEdit2Fill className="copy" />
                                )}
                            </p>
                            {userNameUrl!="my-profile" ?(
                                <Button className="ask" onClick={()=>setOpen(true)}><TbHomeQuestion /> Ask a question</Button>
                            ) :(
                                <Button className="ask"><TbHomeStats /> Requests</Button>
                            )}
                        </div>
                        {userNameUrl!="my-profile" ?(
                            <Tooltip placement="top" title={"Stay up to date"}>
                                <Button className="notif"><MdNotificationsActive /></Button>
                            </Tooltip>
                        ) :(
                            <Tooltip placement="top" title={"Settings"}>
                                <Button className="notif"><MdSettings /></Button>
                            </Tooltip>
                        )}
                    </div>
                    <div className="r-s">
                        {userNameUrl!="my-profile" 
                            ? data?.properties.map((property,idx)=>(<PropertyItem data={property} key={idx} />))
                        :(
                            <div className="tbs">
                                <Tabs
                                    defaultActiveKey="0"
                                    items={[
                                        {
                                            key: "0",
                                            label: `My Property`,
                                            children: (
                                                <div className="porps">
                                                    {data?.properties.map((property,idx)=>(<PropertyItem data={property} key={idx} />))}
                                                </div>
                                            ),
                                            icon: <MdMapsHomeWork />,
                                        },
                                        {
                                            key: "1",
                                            label: `Favorite`,
                                            children: `Favorite`,
                                            icon: <MdFavorite />,
                                        }
                                    ]}
                                />
                            </div>
                        )}
                    </div>
                    {userNameUrl!="my-profile" && (
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
                    )}
                </>
            )}
        </div>
    )
}