import { Button } from "antd";
import { memo } from "react"
import { FaHandPointRight } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";

const Chat = () => {
    return (
        <>
            <h3 className="tit"><FaRegFileLines /> Osama apply to rent propery TES TEST</h3>
            <div className="sec">
                <div className="msg">
                    <div className="notes">
                        <p><FaHandPointRight /> When accept the apply, The chat will open</p>
                    </div>
                    <div className="msgr you">
                        <img src="https://res.cloudinary.com/dvttfm7ns/image/upload/v1738786998/why-choose-mern-stack-for-developing-web-apps_r3ayho.webp" />
                        <div className="df">
                            <p className="mss">
                                kjgfsoifh sof hsiof jsdofi sdf sdfhj shdfsho doshf sdoh f
                            </p>
                            <span>15/56/69</span>
                        </div>
                    </div>
                    <div className="msgr me">
                        <div className="df">
                            <p className="mss">
                                kjgfsoifh sof hsiof jsdofi sdf sdfhj shdfsho doshf sdoh f
                            </p>
                            <span>15/56/69</span>
                        </div>
                    </div>
                </div>
                <div className="btmm">
                    <div className="btns">
                        <Button type="primary">Accept</Button>
                        <Button type="primary" danger >Reject</Button>
                    </div>
                </div>
            </div>

            {/* Questions */}
            {/* <h3 className="tit"><TbHomeQuestion /> Question About Test test test</h3>
            <div className="sec">
                <div className="msg">
                    <div className="notes">
                        <p><FaHandPointRight /> When answer atleast with one reply, The chat will open</p>
                    </div>
                    <div className="msgr you">
                        <img src="https://res.cloudinary.com/dvttfm7ns/image/upload/v1738786998/why-choose-mern-stack-for-developing-web-apps_r3ayho.webp" />
                        <div className="df">
                            <p className="mss">
                                kjgfsoifh sof hsiof jsdofi sdf sdfhj shdfsho doshf sdoh f
                            </p>
                            <span>15/56/69</span>
                        </div>
                    </div>
                    <div className="msgr me">
                        <div className="df">
                            <p className="mss">
                                kjgfsoifh sof hsiof jsdofi sdf sdfhj shdfsho doshf sdoh f
                            </p>
                            <span>15/56/69</span>
                        </div>
                    </div>
                </div>
                <div className="btmm">
                    <div className="inpt">
                        <Input placeholder="Write here..." />
                        <Button type="primary"><IoSendSharp /></Button>
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default memo(Chat);