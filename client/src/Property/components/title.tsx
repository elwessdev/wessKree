import { memo } from 'react';
import { Button, message, Tooltip } from 'antd';

import { IoShareSocialOutline, IoTimeOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useUser } from '../../hooks/userContext';
import { addFavorite } from '../../API/property';
import { formatDistance } from 'date-fns';


type props = {
    title?: string | null,
    state?: string | null,
    city?: string | null,
    zip?: number | null
    neighborhood?: string | null,
    username?: string | null,
    id?: string | undefined,
    scrollToNear?:()=>any,
    createdAt: any
}

const Title = ({title,state,city,zip,neighborhood,username,id,scrollToNear,createdAt}:props) => {
    const {user} = useUser();

    const addToFavorite = async() => {
        const res = await addFavorite(id);
        if(res?.exist){
            message.success("Already in my favorite");
            return;
        }
        if(res?.success){
            message.success("The property added to favorite");
        } else {
            message.error("Something error, Try again");
        }
    }

    return (
        <div className="title">
            <h3>{title}</h3>
            <p>{state}, {city}, {neighborhood} {zip}</p>
            <p className="date"><IoTimeOutline /> {formatDistance(new Date(createdAt), new Date(), { addSuffix: true }).replace("about ", "")}</p>
            {(user && user?.username==username) && (
                <p className='my'>My Property</p>
            )}
            <div className="btns">
                <Button onClick={()=>{
                    navigator.clipboard.writeText(window.location.href);
                    message.success("Link copied");
                }}>
                    <IoShareSocialOutline /> Share
                </Button>
                {user==null&&(
                    <Tooltip placement="top" title={"Login first"}>
                        <Button>
                            <MdFavoriteBorder /> Favorite
                        </Button>
                    </Tooltip>
                )}
                {(user && user?.username!=username) && (
                    <Button onClick={addToFavorite}>
                        <MdFavoriteBorder /> Favorite
                    </Button>
                )}
                <Button onClick={scrollToNear}>
                    <IoMdSearch /> Browser nearby
                </Button>
            </div>
        </div>
    )
}
export default memo(Title);