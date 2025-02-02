import { memo } from 'react';
import { Button } from 'antd';

import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";


type props = {
    title: string | null,
    state: string | null,
    city: string | null,
    zip: number | null
    neighborhood: string | null
}

const Title = ({title,state,city,zip,neighborhood}:props) => {
    return (
        <div className="title">
            <h3>{title}</h3>
            <p>{state}, {city}, {neighborhood} {zip}</p>
            <div className="btns">
                <Button>
                    <IoShareSocialOutline /> Share
                </Button>
                <Button>
                    <MdFavoriteBorder /> Favorite
                </Button>
                <Button>
                    <IoMdSearch /> Browser nearby
                </Button>
            </div>
        </div>
    )
}
export default memo(Title);