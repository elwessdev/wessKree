import "./nav.scss"
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Select, Button, Dropdown,MenuProps } from 'antd';
import Login from "../Auth/Login/login";
import { useUser } from "../context/userContext";
import Logo from '../assets/logo2.jpeg'

// Icons
import { TbHomeSearch, TbHomeHand } from "react-icons/tb";
import { FaHouseUser } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { TbHomeStats } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa";



const options = [
    {
        value: '1',
        label: 'Not Identified',
    },
    {
        value: '2',
        label: 'Closed',
    },
    {
        value: '3',
        label: 'Communicated',
    },
    {
        value: '4',
        label: 'Identified',
    },
    {
        value: '5',
        label: 'Resolved',
    },
    {
        value: '6',
        label: 'Cancelled',
    },
    {
        value: '6',
        label: 'Cancelled',
    },
]

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
            <a><RiLogoutCircleRFill /> Logout</a>
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

export default function Nav(){
    const {user} = useUser();
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

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
                <div className="search-bar">
                    <div className="slc">
                        <div className="sl">
                            <span className="subTitle">State</span>
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Search..."
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={options}
                            />
                        </div>
                        <div className="sl">
                            <span className="subTitle">City</span>
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Search..."
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={options}
                            />
                        </div>
                    </div>
                    <button>
                        <TbHomeSearch />
                    </button>
                </div>
            </div>
            <div className="r-s">
                <div className="btns">
                    {!user?.isActive &&
                        <>
                            <NavLink to={"/setup-profile"}><FaUserCheck />Setup Profile</NavLink>
                            <Button>Logout</Button>
                        </>
                    }
                    {user?.isActive && (
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