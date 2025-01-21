import { memo } from 'react';
import { Button } from 'antd';

import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const Title = () => {
    return (
        <div className="title">
            <h3>Name of property</h3>
            <p>Kebili, Douz, rue 5458</p>
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