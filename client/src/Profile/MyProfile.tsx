import "./style.scss"
import { Button, Tabs, Tooltip } from 'antd';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
// import { useQuery } from "@tanstack/react-query";
// import { getUserInfos } from "../API/user";
import { useUser } from "../hooks/userContext";
import MyProperty from "./Tabs/MyProperty";
import Favorite from "./Tabs/Favorite";
import { NavLink, useNavigate } from "react-router-dom";


// Icons
import { MdSettings, MdOutlineLocationOn, MdMapsHomeWork, MdFavorite } from "react-icons/md";
import { TbHomeStats } from "react-icons/tb";
import { FaSquareWhatsapp, FaSquarePhone } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { MdContacts } from "react-icons/md";


export default function MyProfile(){
    const { user }: any = useUser();
    const navigate = useNavigate();

    // // User info
    // const { data, isLoading, error } = useQuery({
    //     queryFn: () => getUserInfos(user?.username),
    //     queryKey: ["myData", user?.username],
    //     enabled: !!user?.username,
    //     refetchOnWindowFocus: true,
    // });
    

    // console.log(data);

    return (
        <div id="profile">
            <div className="l-s">
                {/* {isLoading && (
                    <Spin size="large" />
                )}
                {error && <h1>Can't load profile, Try again</h1>} */}
                {user && (
                    <>
                        <img src={user?.photo} />
                        <h3>{user?.publicName}</h3>
                        <p><MdOutlineLocationOn /> {user?.state}, {user?.city}</p>
                        <div className="contact">
                            {(user?.contact?.phone.length || user?.contact?.whatsapp.length)
                                ? (
                                    <>
                                        {user?.contact?.phone &&
                                            <p>
                                                <FaSquarePhone />
                                                <span>{user?.contact?.phone}</span>
                                                <RiEdit2Fill onClick={()=>navigate("/settings")} className="copy" />
                                            </p>
                                        }
                                        {user?.contact?.whatsapp && 
                                            <p>
                                                <FaSquareWhatsapp />
                                                <span>{user?.contact?.whatsapp}</span>
                                                <RiEdit2Fill onClick={()=>navigate("/settings")} className="copy" />
                                            </p>
                                        }
                                    </>
                                )
                                : (
                                    <NavLink to={"/settings"} className="addContact"><MdContacts /> Add Contact</NavLink>
                                )
                            }
                            <Button className="ask"><TbHomeStats /> Requests</Button>
                        </div>
                        <Tooltip placement="top" title={"Settings"}>
                            <Button className="notif" onClick={()=>navigate("/settings")}><MdSettings /></Button>
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