import "./style.scss"
import { Button, Spin, Tabs, Tooltip } from 'antd';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { getUserInfos } from "../API/user";
import { useUser } from "../context/userContext";


// Icons
import { MdSettings, MdOutlineLocationOn, MdMapsHomeWork, MdFavorite } from "react-icons/md";
import { TbHomeStats } from "react-icons/tb";
import { FaSquareWhatsapp, FaSquarePhone } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import MyProperty from "./Tabs/MyProperty";
import Favorite from "./Tabs/Favorite";


export default function MyProfile(){
    const { user }: any = useUser();

    // User info
    const { data, isLoading, error } = useQuery({
        queryFn: () => getUserInfos(user?.username),
        queryKey: ["myData", user?.username],
        enabled: !!user?.username,
        refetchOnWindowFocus: true,
    });
    

    // console.log(user);

    return (
        <div id="profile">
            <div className="l-s">
                {isLoading && (
                    <Spin size="large" />
                )}
                {error && <h1>Can't load profile, Try again</h1>}
                {data && (
                    <>
                        <img src={data?.photo} />
                        <h3>{data?.username}</h3>
                        <p><MdOutlineLocationOn /> {data?.state}, {data?.city}</p>
                        <div className="contact">
                            <p>
                                <FaSquarePhone />
                                <span>226589652</span>
                                <RiEdit2Fill className="copy" />
                            </p>
                            <p>
                                <FaSquareWhatsapp />
                                <span>226589652</span>
                                <RiEdit2Fill className="copy" />
                            </p>
                            <Button className="ask"><TbHomeStats /> Requests</Button>
                        </div>
                        <Tooltip placement="top" title={"Settings"}>
                            <Button className="notif"><MdSettings /></Button>
                        </Tooltip>
                        </>
                )}
            </div>
            <div className="r-s">
                <div className="tbs">
                    <Tabs
                        defaultActiveKey="0"
                        items={[
                            {
                                key: "0",
                                label: `My Property`,
                                children: <MyProperty username={user?.username} />,
                                icon: <MdMapsHomeWork />,
                            },
                            {
                                key: "1",
                                label: `Favorite`,
                                children: <Favorite />,
                                icon: <MdFavorite />,
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}