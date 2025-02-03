import { memo } from 'react';
import { Button } from 'antd';
import { LuBadgeInfo } from "react-icons/lu";
import { TbHomeQuestion } from "react-icons/tb";
import { NavLink } from 'react-router-dom';


type props = {
    user: {
        username: string,
        state: string,
        city: string,
        photo: string
    }
}

const Owner = ({user}:props) => {
    return (
        <div className="owner">
            <h3>Property owner</h3>
            <div className="profile">
                <img src={user?.photo} alt={user?.username} />
                <div className="det">
                    <p>{user?.username}</p>
                    <span>{user?.state}, {user?.city}</span>
                </div>
            </div>
            <div className="btns">
                <Button>
                    <TbHomeQuestion /> Ask a question
                </Button>
                <NavLink to={"/profile"}>
                    <LuBadgeInfo /> Get more info
                </NavLink>
            </div>
        </div>
    )
}
export default memo(Owner);