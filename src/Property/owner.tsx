import { memo } from 'react';
import { Button } from 'antd';
import { LuBadgeInfo } from "react-icons/lu";
import { TbHomeQuestion } from "react-icons/tb";

const Owner = () => {
    return (
        <div className="owner">
            <h3>Property owner</h3>
            <div className="profile">
                <img src="https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-05.jpg" />
                <div className="det">
                    <p>Osama Test</p>
                    <span>Kebili, Douz</span>
                </div>
            </div>
            <div className="btns">
                <Button>
                    <TbHomeQuestion /> Ask a question
                </Button>
                <Button>
                    <LuBadgeInfo /> Get more info
                </Button>
            </div>
        </div>
    )
}
export default memo(Owner);