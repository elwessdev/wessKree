import "./nav.scss"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Dropdown } from 'antd';
import Login from "../Auth/Login/login";
import { useUser } from "../hooks/userContext";
import Logo from '../assets/logo2.jpeg'
import SearchNav from "./components/search";

// Icons
// import { TbHomeHand } from "react-icons/tb";
import { FaHouseUser } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { TbHomeStats } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineAddHomeWork } from "react-icons/md";
import Notification from "./components/notification";



export default function Nav(){
    const {user, logout} = useUser();
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsLoginOpen(true);
    };

    return(
        <div id="nav" className="container mx-auto">
            <div className="l-s">
                <NavLink to={"/"} className="logo">
                    <img src={Logo} alt="KreeTN" />
                </NavLink>
            </div>
            <div className="c-s">
                <SearchNav />
            </div>
            <div className="r-s">
                <div className="btns">
                    {user?.isActive==false &&
                        <>
                            <NavLink to={"/setup-profile"}><FaUserCheck />Setup Profile</NavLink>
                            <Button onClick={logout}>Logout</Button>
                        </>
                    }
                    {user?.isActive==true && (
                        <>
                            <NavLink to={"/post-property"}><MdOutlineAddHomeWork /> Post Property</NavLink>
                            <NavLink to={"/requests"}><TbHomeStats /> Requests</NavLink>
                            <Notification userId={user?._id} />
                            <Dropdown 
                                menu={{
                                    items:[
                                        {
                                            key: '1',
                                            label: (
                                                <NavLink to={"/my-profile"}><FaHouseUser /> Profile</NavLink>
                                            ),
                                        },
                                        {
                                            key: '2',
                                            label: (
                                                <NavLink to={"/settings"}><FaUserCog /> Settings</NavLink>
                                            ),
                                        },
                                        {
                                            key: '3',
                                            label: (
                                                <a onClick={()=>{
                                                    logout();
                                                    navigate("/");
                                                }}>
                                                    <RiLogoutCircleRFill /> Logout
                                                </a>
                                            ),
                                        },
                                    ]
                                }}
                                placement="bottomRight"
                                arrow
                            >
                                <img className="profile" src={user?.photo} />
                            </Dropdown>
                        </>
                    )}
                    {user==null && (
                        <>
                            <Button onClick={showModal}>Login</Button>
                            <NavLink to={"/signup"}>Sign up</NavLink>
                        </>
                    )}
                </div>
            </div>
            <Login open={isLoginOpen} cancel={setIsLoginOpen} />
        </div>
    )
}