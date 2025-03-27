import { memo, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { useUser } from '../../hooks/userContext';

import { LuBadgeInfo } from "react-icons/lu";
import { FaSquarePhone, FaSquareWhatsapp } from 'react-icons/fa6';
import { MdContentCopy } from 'react-icons/md';
// import { TbHomeQuestion } from "react-icons/tb";

type props = {
    title?: string,
    userInfo: {
        username: string,
        publicName: string,
        state: string,
        city: string,
        photo: string
    },
    contact: any
}

const Owner = ({userInfo,contact}:props) => {
    const {user} = useUser();
    const [open, setOpen] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");

    const handleQuestion = ()=>{
        message.success("Message sent")
    }

    return (
        <>
            {(contact&&(contact?.phone.length>0||contact?.whatsapp.length>0)) && (
                <div className='contact'>
                    <h3>Contact Info</h3>
                    {contact?.phone && (
                        <p>
                            <FaSquarePhone />
                            <span>{contact.phone}</span>
                            <MdContentCopy 
                                onClick={()=>{
                                    navigator.clipboard.writeText(contact.phone);
                                    message.success("Copied");
                                }} 
                                className="copy" 
                            />
                        </p>
                    )}
                    {contact?.whatsapp && (
                        <p>
                            <FaSquareWhatsapp />
                            <span>{contact.whatsapp}</span>
                            <MdContentCopy 
                                onClick={()=>{
                                    navigator.clipboard.writeText(contact.whatsapp);
                                    message.success("Copied");
                                }} 
                                className="copy"
                            />
                        </p>
                    )}
                </div>
            )}
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
                    {/* {userInfo?.username != user?.username && (
                        <>
                            <Button onClick={()=>setOpen(true)} disabled={user?.username ?true :false}>
                                <TbHomeQuestion /> Ask a question
                            </Button>
                        </>
                    )} */}
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
        </>
        
    )
}
export default memo(Owner);