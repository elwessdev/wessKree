import { Badge, Dropdown, notification, Spin } from "antd";
// import { useSocket } from "../../hooks/socket";
import { memo, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotifications, seenNotifs } from "../../API/notification";
import { formatDistance } from "date-fns";
import NotiffNew from '../../assets/newNotif.webm'
import { NavLink } from "react-router-dom";
// import Notiff from '../../assets/notif.webm'

// Icons
import { IoIosNotifications } from "react-icons/io";
// import { SmileOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useUser } from "../../hooks/userContext";



// const socket = io(import.meta.env.VITE_API_URL);

// Types
type props = {
    userId?:string
}

const Notification = ({userId}:props)=>{
    const {user} = useUser();
    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();
    const [notifCount, setNotifCount]=useState<number>(0);

    // Get notifications
    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchNotifications(),
        queryKey: ['notifications', userId],
        enabled: !!userId
    });

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setNotifCount(data.filter((notif: any) => !notif.seen).length);
        }
    }, [data]);


    // useEffect(() => {
    //     console.log(user);
    //     if (!userId||user===null) return;

    //     // Register the user on the socket
    //     // socket.emit('registerUser', userId);
    //     console.log("test");
    //     socket.emit("registerUser",userId);

    //     // socket.on(`notify_${userId}`, (msg) => {
    //     //     queryClient.invalidateQueries({ queryKey: ['notifications'] });
    //     //     api.open({
    //     //         message: 'New Notification',
    //     //         description: msg,
    //     //         icon: <span className="notif_icon">
    //     //             <video
    //     //                 autoPlay
    //     //                 loop
    //     //                 muted
    //     //             >
    //     //                 <source src={NotiffNew} type="video/webm" />
    //     //                 Your browser does not support the video tag.
    //     //             </video>
    //     //         </span>,
    //     //         showProgress: true,
    //     //         pauseOnHover: true,
    //     //     });
    //     //     setNotifCount((prev) => prev + 1);
    //     // });

    //     socket.on("notify", (msg) => {
    //         queryClient.invalidateQueries({ queryKey: ['notifications'] });
    //         api.open({
    //             message: 'New Notification',
    //             description: msg,
    //             icon: <span className="notif_icon">
    //                 <video
    //                     autoPlay
    //                     loop
    //                     muted
    //                 >
    //                     <source src={NotiffNew} type="video/webm" />
    //                     Your browser does not support the video tag.
    //                 </video>
    //             </span>,
    //             showProgress: true,
    //             pauseOnHover: true,
    //         });
    //         setNotifCount((prev) => prev + 1);
    //     });

    //     return () => {
    //         // socket.off(`notify_${userId}`);
    //         socket.off("notify");
    //     };
    // }, [userId, user]);

    const handleSeen = async() => {
        try {
            const res = await seenNotifs();
            if(res.status==200){
                setNotifCount(0);
            }
        } catch(err){
            console.log("seen error",err);
        }
    }

    return (
        <>
            {contextHolder}
            <Dropdown
                onOpenChange={handleSeen}
                className="notif-dropdown"
                // open={true}
                dropdownRender={(menu) => (
                    <div className="custom-notif-dropdown">{menu}</div>
                )}
                // open={true}
                menu={{ items: isLoading
                        ? [{
                            key: "loading",
                            label: (
                                <div className="notif-loading">
                                    <Spin indicator={<LoadingOutlined spin />} />
                                </div>
                            ),
                        }]
                        : error
                        ? [{
                            key: "error",
                            label: (
                                <div className="notif-error">
                                    <p
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "500",
                                            fontSize: "15px"
                                        }}
                                    >
                                        Failed to load notifications.
                                    </p>
                                </div>
                            ),
                        }]
                        : data && Array.isArray(data) && data.length > 0
                        ? data.map((notif: any) => ({
                            key: notif._id,
                            label: (
                                <div className={`notif-item ${notif.seen ? "seen" : "unseen"}`}>
                                    <img src={notif?.img} alt="img" />
                                    <div className="cntn">
                                        <p>{notif.message}</p>
                                        <span className="notif-time">
                                            <MdOutlineAccessTime /> 
                                            {formatDistance(new Date(notif?.createdAt), new Date(), { addSuffix: true }).replace("about ", "")}
                                        </span>
                                    </div>
                                    {notif?.link && notif?.link!="/" && (
                                        <NavLink className={"prev"} to={`${notif?.link}`}><FaEye /></NavLink>
                                    )}
                                </div>
                            ),
                        }))
                        : [{
                            key: "empty",
                            label: (
                                <div className="empty-notif">
                                    <p 
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "500",
                                            fontSize: "15px"
                                        }}
                                    >
                                        No notifications available
                                    </p>
                                </div>
                            ),
                        }]
                }}
                trigger={['click']}
                placement="bottomRight"
            >
                <div className="contt">
                    <div className="notif">
                        {notifCount>0 && 
                            <Badge count={notifCount}>
                                <IoIosNotifications />
                            </Badge>
                        }
                        {notifCount==0 && <IoIosNotifications /> }
                    </div>
                    {/* <video
                        autoPlay
                        loop
                        muted
                    >
                        <source src={Notiff} type="video/webm" />
                        Your browser does not support the video tag.
                    </video> */}
                </div>
            </Dropdown>
        </>
    )
}
export default memo(Notification);