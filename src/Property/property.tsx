import "./property.scss"

import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdSearch, IoIosCheckmarkCircle } from "react-icons/io";
import { LuBedSingle, LuBadgeInfo } from "react-icons/lu";
import { BiBath } from "react-icons/bi";
import { PiRectangleDashedBold } from "react-icons/pi";
import { GrStatusGood } from "react-icons/gr";
import { TbHomeQuestion } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";
import { MdOutlineYard } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdFireplace } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { TbAirConditioning } from "react-icons/tb";
import { FaSwimmingPool } from "react-icons/fa";
import { MdOutlineKitchen } from "react-icons/md";
import { GiGasStove } from "react-icons/gi";
import { MdBalcony } from "react-icons/md";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { Button } from 'antd';




export default function Property(){
    return (
        <div id="property">
            {/* Title */}
            <div className="title">
                <h3>Name of property</h3>
                <p>1 jkshdf sdjfh doskfjq</p>
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
            {/* Gallery */}
            <div className="gallery">
                <div className="main-image">
                    <img src="https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fm.sothebysrealty.com%2F1253i215%2Fs9edvqq08p8s4wpet38xc1aqe4i215&option=N&h=472&permitphotoenlargement=false" alt="3" />
                </div>
                <div className="top-image">
                    <img src="https://imagescdn.homes.com/i2/L2eusQGotou75jF6c_mFcQ5wSXVL_wiwzk6ig_6qGqA/111/3201-overland-ave-los-angeles-ca-primaryphoto.jpg?p=1" alt="2" />
                </div>
                <div className="bottom-images">
                    <div className="small-image">
                        <img src="https://cdn.vox-cdn.com/thumbor/898j2hZdnl2L_53peT0V5aaqXj4=/0x0:833x529/1400x1050/filters:focal(351x199:483x331):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/56221709/ISah33hip2p9b80000000000.0.jpg" alt="1" />
                    </div>
                    <div className="small-image">
                        <img src="https://photos.zillowstatic.com/fp/e69878b5870c3c4d2bdec71df6e5ac21-p_e.jpg" alt="4" />
                    </div>
                </div>
                <Button>
                    <TbPhotoSquareRounded /> View all photos
                </Button>
            </div>
            <div className="btm-prt">
                {/* Details */}
                <div className="details">
                    <div className="req">
                        <div className="r">
                            <p>Rooms</p>
                            <span><LuBedSingle /> 4</span>
                        </div>
                        <div className="r">
                            <p>Bathrooms</p>
                            <span><BiBath /> 4</span>
                        </div>
                        <div className="r">
                            <p>Square Area</p>
                            <span><PiRectangleDashedBold /> 6x8.5 m²</span>
                        </div>
                        <div className="r">
                            <p>Square Area</p>
                            <span><PiRectangleDashedBold /> 6x8.5 m²</span>
                        </div>
                        <div className="r">
                            <p>Status</p>
                            <span><GrStatusGood /> Active</span>
                        </div>
                    </div>
                    <div className="about">
                        <h3>About this home</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero porro vel aliquam inventore minus neque eum, mollitia veritatis eius officia earum sunt temporibus commodi dolorem, dolores ex, incidunt expedita? Nemo vero porro vel aliquam inventore minus neque eum, mollitia veritatis eius officia earum sunt temporibus commodi dolorem, dolores ex, incidunt expedita?
                        Nemo vero porro vel aliquam inventore minus neque eum, mollitia veritatis eius officia earum sunt temporibus commodi dolorem, dolores ex, incidunt expedita?
                        </p>
                    </div>
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
                    <div className="line"></div>
                    <div className="feature">
                        <h3>Rental features</h3>
                        <div className="items">
                            <div className="f">
                                <div className="icon"><FaWifi /></div>
                                <p>Wifi</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><MdOutlineYard /></div>
                                <p>Backyard</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><BsPersonWorkspace /></div>
                                <p>Workspace</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><AiFillSafetyCertificate /></div>
                                <p>Parking</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><AiFillSafetyCertificate /></div>
                                <p>Garage</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><TbAirConditioning /></div>
                                <p>Air Conditioner</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><FaSwimmingPool /></div>
                                <p>Swimmingpool</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><MdOutlineKitchen /></div>
                                <p>Refrigerateur</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><MdFireplace /></div>
                                <p>Heating</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><GiGasStove /></div>
                                <p>Stove</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                            <div className="f">
                                <div className="icon"><MdBalcony /></div>
                                <p>Balcony</p>
                                <div className="ok">
                                    <IoIosCheckmarkCircle />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Apply */}
                <div className="apply">

                </div>
            </div>
        </div>
    )
}