import { useState, memo } from "react";
import { Button, DatePicker, message, Tooltip } from "antd"
import { sendApply } from "../../API/request";
import { useUser } from "../../hooks/userContext";
import dayjs from 'dayjs';


// Icons
import { FaRegFileLines } from "react-icons/fa6";
import { BiHomeAlt } from "react-icons/bi";
import { TbBrandYoutube } from "react-icons/tb";
import { TbHomeHand } from "react-icons/tb";
import { createNotification } from "../../API/notification";


type props = {
    price?: any,
    id?: string,
    name?:string,
    username: string,
    title: string,
}

const Apply = ({price,id,name,username,title}:props) => {
    const {user} = useUser();
    // const [selectedPrice, setSelectedPrice]=useState<string|null>(null);
    
    // Request Tour
    const [tourType, setTourType]=useState<string | null>(null);
    const [tourDate, setTourDate]=useState<any>(null);
    const [tourError, setTourError]=useState<string|null>(null);
    const [loading, setloading]=useState<boolean>(false);
    const [loadingReq, setLoadingReq]=useState<boolean>(false);

    const handleRequestTour = async() => {
        setTourError("");
        if(tourType==null){
            setTourError("Please Choose Tour Type");
            return;
        }
        if(tourDate==null){
            setTourError("Please Select Tour Date");
            return;
        }
        setLoadingReq(true);
        const res = await sendApply({
            property:id,
            renter:user?._id,
            type:"tour",
            message: `👋 Hi! ${name}, I'd love to visit your property for an ${tourType} tour on ${dayjs(tourDate).format("DD MMMM YYYY")}. Is that possible? 🚶‍♂️🏠`
        });
        if(res?.status==203){
            setLoadingReq(false);
            message.error(res?.data?.message);
            return;
        }
        if(res?.status!=200){
            setLoadingReq(false);
            message.error(res?.data?.message);
            return;
        }
        await createNotification(
            `${user?.publicName} request a Tour to your property ${title}`,
            username
        );
        message.success("Tour sent successfully, wait response");
        setTourType(null);
        setTourDate(null);
        setLoadingReq(false);
        console.log(tourType,tourDate);
    }

    // const handleSelectPrice = (p:string) => {
    //     setSelectedPrice(p)
    // }
    // console.log(Object.entries(price));

    const handleApply = async()=>{
        setloading(true);
        try{
            const res = await sendApply({
                property:id,
                renter:user?._id,
                type:"apply",
                message: `👋 Hello! ${name}, I'm interested in your property. Is it still available? 🏡`
            });
            if(res?.status==203){
                throw new Error(res?.data?.message);
            }
            if(res?.status!=200){
                throw new Error(res?.data?.message);
            }
            await createNotification(
                `${user?.publicName} Apply to your property ${title}`,
                username
            );
            message.success("Apply sent successfully, wait response");
        } catch (err:any){
            message.error(err);
        } finally{
            setloading(false);
        }

        // const res = await sendApply({
        //     property:id,
        //     renter:user?._id,
        //     type:"apply",
        //     message: `👋 Hello! ${name}, I'm interested in your property. Is it still available? 🏡`
        // });
        // if(res?.status==203){
        //     setloading(false);
        //     message.error(res?.data?.message);
        //     return;
        // }
        // if(res?.status!=200){
        //     setloading(false);
        //     message.error(res?.data?.message);
        //     return;
        // }
        // setloading(false);
        // message.success("Apply sent successfully, wait response");
    }

    return (
        <div className="apply">
            <div className="price">
                <h3>Rent Price</h3>
                {price.length>1
                    ?(
                        <div className="many">
                            {price && Object.entries(price).map((p:any,idx:number)=>(
                                <p
                                    key={idx}
                                    // className={`nrml ${selectedPrice==p[0] ?"active" :""}`}
                                    // onClick={()=>handleSelectPrice(p[0])}
                                >
                                    {p[1][1]}
                                    <b>DT</b>
                                    <span>/{p[1][0]}</span>
                                </p>
                            ))}
                        </div>
                    )
                    :(
                        <p className="nrml">{price[0][1]}<b>DT</b> <span>/{price[0][0]}</span></p>
                    )
                }
            </div>
            {user 
                ?(
                    <Button onClick={handleApply} disabled={user?.username==username ?true :false} loading={loading}>
                        {loading ?"" :(<><FaRegFileLines className="ico" /> Apply now</>)}
                    </Button>
                )
                :(
                    <Tooltip placement="top" title={"Login to apply"}>
                        <Button><FaRegFileLines /> Apply now</Button>
                    </Tooltip>
                )
            }
            <div className="line"></div>
            <div className="tour">
                <h3>Request a home tour</h3>
                <div className="options">
                    <Button 
                        className={tourType === "In-Person" ?"active" :""}
                        onClick={()=>setTourType("In-Person")}
                        disabled={user?.username==username ?true :false}
                    >
                        <BiHomeAlt /> In Person
                    </Button>
                    <Button 
                        className={tourType === "Virtual" ?"active" :""}
                        onClick={()=>setTourType("Virtual")}
                        disabled={user?.username==username ?true :false}
                    >
                        <TbBrandYoutube /> Virtual
                    </Button>
                </div>
                <DatePicker 
                    disabled={user?.username==username ?true :false}
                    placeholder="Select tour date"
                    onChange={(date) => setTourDate(date)}
                    value={tourDate}
                />
                <p style={{color:" #F00", fontWeight: "500", fontSize: "14px"}}>{tourError}</p>
                {user 
                    ?(
                        <Button disabled={user?.username==username ?true :false} loading={loadingReq} onClick={handleRequestTour}>
                            {loadingReq ?"" :(<><TbHomeHand /> Request a tour</>)}
                        </Button>
                    )
                    :(
                        <Tooltip placement="top" title={"Login to request a tour"}>
                            <Button>
                                <TbHomeHand /> Request a tour
                            </Button>
                        </Tooltip>
                    )
                }
            </div>
        </div>
    )
}
export default memo(Apply);