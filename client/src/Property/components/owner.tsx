import { memo, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { useUser } from '../../context/userContext';

import { LuBadgeInfo } from "react-icons/lu";
import { TbHomeQuestion } from "react-icons/tb";

type props = {
    title?: string,
    userInfo: {
        username: string,
        publicName: string,
        state: string,
        city: string,
        photo: string
    }
}

const Owner = ({userInfo}:props) => {
    const {user} = useUser();
    const [open, setOpen] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");

    const handleQuestion = ()=>{
        message.success("Message sent")
    }

    return (
        <div className="owner">
            <h3>Property owner</h3>
            <div className="profile">
                <img src={userInfo?.photo} alt={userInfo?.username} />
                <div className="det">
                    <p>{userInfo?.publicName}</p>
                    <span>{userInfo?.state}, {userInfo?.city}</span>
                </div>
            </div>
            <div className="btns">
                {userInfo?.username != user?.username && (
                    <>
                        <Button onClick={()=>setOpen(true)}>
                            <TbHomeQuestion /> Ask a question
                        </Button>
                    </>
                )}
                <NavLink to={userInfo?.username==user?.username ?`/my-profile` :`/profile/${userInfo?.username}`}>
                    <LuBadgeInfo /> Get more info
                </NavLink>
            </div>
            <Modal
                open={open}
                title={`Ask a Question`}
                // onOk={handleQuestion}
                onCancel={()=>setOpen(false)}
                footer={() => (
                    <>
                        <Button onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button type="primary" onClick={handleQuestion}>Sent</Button>
                    </>
                )}
            >
                <TextArea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Write the Question here..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
            </Modal>
        </div>
    )
}
export default memo(Owner);