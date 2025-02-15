import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Spin } from "antd";
import { memo, useEffect, useRef, useState } from "react"
import { useUser } from "../../hooks/userContext";
import { changeApplyStatus, chatDetails, sendMsg } from "../../API/request";
import { createNotification } from "../../API/notification";
import { NavLink } from "react-router-dom";
import { formatRelative } from "date-fns";

// Icons
import { FaHandPointRight } from "react-icons/fa";
// import { FaRegFileLines } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { LoadingOutlined } from "@ant-design/icons";



// Types
type props = {
    id: string
}

const Chat = ({id}:props) => {
    const bottomRef = useRef<any>(null);
    const {user} = useUser();
    const queryClient = useQueryClient();
    const [msgValue,setMsgValue]=useState<string>("");
    const [loading,setLoading]=useState<boolean>(false);

    // Chat details
    const {data,isLoading,error} = useQuery({
        queryFn: () => chatDetails(id),
        queryKey: ["chatDetails",[id]],
        enabled: !!id,
    });

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },[data]);
    
    const details = data?.data;
    const myType = data?.data?.owner?.username===user?.username ?"owner" :"renter";
    // console.log(myType);

    const handleChangeStatus = async(status:string) => {
        setLoading(true);
        const res = await changeApplyStatus(status,details?._id);
        if(res?.data?.success){
            const notif = await createNotification(
                `${details?.owner?.publicName} ${status} your application for property ${details?.property?.title}`,
                details?.renter?.username
            );
            console.log(notif);
            setLoading(false);
            queryClient.invalidateQueries({ queryKey: ['chatDetails'] });
            return;
        }
        setLoading(false);
        message.error("Something erro, Try again");
    }

    const handleSendMsg = async()=>{
        setLoading(true);
        const res = await sendMsg(myType,msgValue,details?._id);
        if(res?.data.success){
            setLoading(false);
            setMsgValue("");
            queryClient.invalidateQueries({ queryKey: ['chatDetails'] });
            return;
        }
        setLoading(false);
        message.error("Something erro, Try again");
    }

    return (
        <>
            {error && (
                <p>Error</p>
            )}
            {isLoading && (
                <Spin size="large" />
            )}
            {details && (
                <>
                    <div className="tit">
                        <NavLink target="_blank" to={`/property/${details?.property?._id}`}><MdMapsHomeWork />{details?.property?.title}</NavLink>
                        <p><MdLocationOn />{details?.property?.state}, {details?.property?.city}</p>
                        <p><FaHouseUser />{details?.owner?.username === user?.username ? "Me" : details?.owner?.publicName}</p>
                        {details?.status=="accepted"&& <p><IoIosCheckmarkCircle /> Accepted</p>}
                        {details?.status=="rejected"&& <p><IoCloseCircle /> Rejected</p>}
                        {details?.status=="pending"&& <p><MdOutlinePendingActions /> Pending</p>}
                        {details?.status=="closed"&& <p><IoCloseCircle /> Closed</p>}
                        {(details?.owner?.username==user?.username&&details?.status=="accepted") &&
                            <Button onClick={()=>handleChangeStatus("closed")} type="primary" danger>Close chat</Button>
                        }
                    </div>
                    <div className="sec">
                        <div className="msg">
                            {details?.owner?.username === user?.username && (
                                <div className="notes">
                                    <p><FaHandPointRight /> When accept the apply, The chat will open</p>
                                </div>
                            )}
                            {details?.messages && 
                                details?.messages?.map((msg:any,idx:number)=>(
                                    <>
                                        <div className="blk">
                                            <div className={
                                                    msg?.type===myType
                                                    ?"msgr me"
                                                    :"msgr you"
                                                } key={msg?._id}>
                                                {msg?.type!=myType && (
                                                        msg?.type=="owner"
                                                        ?<img src={details?.owner?.photo} alt={details?.owner?.publicName} />
                                                        :<img src={details?.renter?.photo} alt={details?.renter?.publicName} />
                                                    )
                                                }
                                                <div className="df">
                                                    {msg?.type!=myType && (
                                                            msg?.type=="owner"
                                                            ?<h3>{details?.owner?.publicName}</h3>
                                                            :<h3>{details?.renter?.publicName}</h3>
                                                        )
                                                    }
                                                    <p className="mss">{msg?.content}</p>
                                                    <span>{formatRelative(new Date(msg?.createdAt), new Date())}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {idx==0&&details?.status=="accepted" && (
                                            <p className="hint accepted"><FaCircleCheck /> The application Accepcted and The chat opened</p>
                                        )}
                                        {idx==0&&details?.status=="rejected" && (
                                            <p className="hint rejected"><IoMdCloseCircle /> The application rejected </p>
                                        )}
                                    </>
                                ))                      
                            }
                            {details?.status=="closed" && (
                                <p className="hint rejected"><IoMdCloseCircle /> {details?.owner?.publicName} Closed The Chat </p>
                            )}
                            <div ref={bottomRef} />
                        </div>
                        <div className="btmm">
                            {details?.status=="pending" &&
                                (
                                    details?.owner?.username === user?.username
                                    ?(
                                        <div className="btns">
                                            {loading
                                                ? <Spin indicator={<LoadingOutlined spin />} />
                                                :(
                                                    <>
                                                        <Button type="primary" onClick={()=>handleChangeStatus("accepted")}>
                                                            Accept
                                                        </Button>
                                                        <Button type="primary" onClick={()=>handleChangeStatus("rejected")} danger >Reject</Button>
                                                    </>
                                                )
                                            }
                                        </div>
                                    )
                                    :(
                                        <p className="worning">
                                            {/* <MdOutlinePendingActions />  */}
                                            Wait {details?.owner?.publicName} response 
                                        </p>
                                    )
                                )
                            }
                            {(details?.status=="rejected"||details?.status=="closed") &&(
                                <p className="worning">Can't send a message</p>
                            )}
                            {details?.status=="accepted" &&(
                                <div className="inpt">
                                    <Input placeholder="Write here..." value={msgValue} onChange={e=>setMsgValue(e.target.value)} />
                                    <Button type="primary" onClick={handleSendMsg}><IoSendSharp /></Button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
export default memo(Chat);