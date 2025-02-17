import "./style.scss"
import { Button, message, Modal, Spin, Tooltip, Empty, Typography } from 'antd';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import PropertyItem from "../Home/Properties/property-item";
// import { Tabs } from 'antd';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { follow, getUserInfos, unFollow, userProperties } from "../API/user";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useParams } from "react-router-dom";


// Icons
import { MdContentCopy, MdOutlineLocationOn, MdNotificationsActive } from "react-icons/md";
// import { TbHomeQuestion } from "react-icons/tb";
import { FaSquareWhatsapp, FaSquarePhone } from "react-icons/fa6";

type params = Record<string, string | undefined>;

export default function UserProfile(){
    const {userNameUrl}:any = useParams<params>();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");

    const {data:userInfo,isLoading:infoLoading,error:infoError} = useQuery({
        queryFn: () => getUserInfos(userNameUrl),
        queryKey: ["userInfos",[userNameUrl]],
        refetchOnWindowFocus: true,
        enabled: !!userNameUrl
        // staleTime: Infinity
    })

    const {data:properties,isLoading:propertiesLoading,error:propertiesError} = useQuery({
        queryFn: () => userProperties(userNameUrl),
        queryKey: ["properties",[userNameUrl]],
        refetchOnWindowFocus: true,
        enabled: !!userNameUrl
        // staleTime: Infinity
    })

    console.log(userInfo);
    // console.log(properties);

    const handleQuestion = ()=>{
        message.success("Message sent")
    }

    const handleFollow = async() => {
        const res:any = await follow(userNameUrl);
        // console.log(res);
        if(res?.status!=200){
            message.error("Something went wrong, Try again later");
            return;
        }
        queryClient.invalidateQueries({queryKey:["userInfos"]});
        message.success(res?.data.message);
    }

    const handleUnFollow = async() => {
        const res:any = await unFollow(userNameUrl);
        // console.log(res);
        if(res?.status!=200){
            message.error("Something went wrong, Try again later");
            return;
        }
        queryClient.invalidateQueries({queryKey:["userInfos"]});
        message.success(res?.data.message);
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
                        <h3>{userInfo?.publicName}</h3>
                        <p><MdOutlineLocationOn /> {userInfo?.state}, {userInfo?.city}</p>
                        <div className="contact">
                            {userInfo?.contact && (
                                <>
                                    {userInfo?.contact?.phone?.length && (
                                        <p>
                                            <FaSquarePhone />
                                            <span>{userInfo?.contact?.phone}</span>
                                            <MdContentCopy className="copy" />
                                        </p>
                                    )}
                                    {userInfo?.contact?.whatsapp?.length && (
                                        <p>
                                            <FaSquareWhatsapp />
                                            <span>{userInfo?.contact?.whatsapp}</span>
                                            <MdContentCopy className="copy" />
                                        </p>
                                    )}
                                </>
                            )}
                            {/* <Button className="ask" onClick={()=>setOpen(true)}><TbHomeQuestion /> Ask a question</Button> */}
                        </div>
                        {userInfo?.isFollow
                            ?(
                                <Tooltip placement="top" title={"Unfollow"}>
                                    <Button className="notif active" onClick={handleUnFollow}><MdNotificationsActive /></Button>
                                </Tooltip>
                            )
                            :(
                                <Tooltip placement="top" title={"Stay up to date"}>
                                    <Button className="notif" onClick={handleFollow}><MdNotificationsActive /></Button>
                                </Tooltip>
                            )
                        }
                    </>
                )}
            </div>
            <div className="r-s">
                {propertiesLoading && (
                    <Spin size="large" />
                )}
                {propertiesError && <h1>Something wrong, Refresh page</h1>}
                {properties?.length==0 && (
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        styles={{ image: { height: 60 } }}
                        description={
                            <Typography.Text>
                                No properties listed yet. Ready to showcase your first property?
                            </Typography.Text>
                        }
                        >
                    </Empty>
                )}
                {properties?.length>0 && (
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