import "./nav.scss"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Dropdown,MenuProps } from 'antd';
import Login from "../Auth/Login/login";
import { useUser } from "../context/userContext";
import Logo from '../assets/logo2.jpeg'
import SearchNav from "./search";

// Icons
import { TbHomeHand } from "react-icons/tb";
import { FaHouseUser } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { TbHomeStats } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa";


export default function Nav(){
    const {user, logout} = useUser();
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const profile: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <NavLink to={"/profile"}><FaHouseUser /> Profile</NavLink>
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
                <Button onClick={()=>{
                    logout();
                    navigate("/");
                }}><RiLogoutCircleRFill /> Logout</Button>
            ),
        },
    ];
    const notifications: MenuProps['items'] = [
        {
            key: '1',
            label: (<p>test</p>),
        },
        {
            key: '2',
            label: (<p>test</p>),
        },
        {
            key: '3',
            label: (<p>test</p>),
        },
    ];

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
                            <NavLink to={"/post-property"}><TbHomeHand /> Post Property</NavLink>
                            <NavLink to={"/post-property"}><TbHomeStats /> Requests</NavLink>
                            <Dropdown menu={{ items:notifications }} trigger={['click']} placement="bottom">
                                <div className="notif"><IoIosNotifications /></div>
                            </Dropdown>
                            <Dropdown menu={{items:profile}} placement="bottomRight" arrow>
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