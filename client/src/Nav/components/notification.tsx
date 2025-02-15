import { Badge, Dropdown, notification } from "antd";
// import { useSocket } from "../../hooks/socket";
import { memo, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotifications } from "../../API/notification";

// Icons
import { IoIosNotifications } from "react-icons/io";
import { SmileOutlined } from "@ant-design/icons";
import Notiff from '../../assets/notif.webm'
import NotiffNew from '../../assets/newNotif.webm'


const socket = io("http://localhost:3000");

// Types
type props = {
    userId?:string
}

const Notification = ({userId}:props)=>{
    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();
    const [newNotif, setNewNotif]=useState<boolean>(false);

    // Get notifications
    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchNotifications(),
        queryKey: ['notifications', userId],
        enabled: !!userId, 
    });
    

    useEffect(() => {
        if (!userId) return;

        // Register the user on the socket
        // socket.emit('registerUser', userId);

        // Listen for notifications for the user
        socket.on(`notify_${userId}`, (msg) => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            setNewNotif(true);
            api.open({
                message: 'New Notification',
                description: msg,
                icon: <span className="notif_icon">
                    <video
                        autoPlay
                        loop
                        muted
                    >
                        <source src={NotiffNew} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </span>,
                showProgress: true,
                pauseOnHover: true,
            });
        });

        // Cleanup the socket listener when the component is unmounted or userId changes
        return () => {
            socket.off(`notify_${userId}`);
        };
    }, [userId, queryClient]);

    // // Handle loading and error states
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error loading notifications</div>;

    return (
        <>
            {contextHolder}
            <Dropdown
                onOpenChange={()=>setNewNotif(false)}
                className="notif-dropdown"
                dropdownRender={(menu) => (
                    <div className="custom-notif-dropdown">{menu}</div>
                )}
                menu={{items:data?.length
                    ? data.map((notif:any) => ({
                        key: notif._id,
                        label: (
                            <div className={`notif-item ${notif.seen ? "seen" : "unseen"}`}>
                                <p>{notif.message}</p>
                                <span className="notif-time">{new Date(notif.createdAt).toLocaleString()}</span>
                            </div>
                        ),
                    }))
                    : []}} 
                trigger={['click']}
                placement="bottomRight"
            >
                <div className="contt">
                    <div className="notif">
                        <Badge dot={newNotif}>
                        <IoIosNotifications />
                        </Badge>
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