import "./style.scss"
import { useState } from "react";
import { message, Steps } from 'antd';
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import axios from "axios";

// Type
interface step1Values {
    title?: string,
    type?: string,
    category?: string[],
    rooms?: string,
    bathrooms?: string,
    bedrooms?: string,
    kitchen?: string,
    furnishingStatus?: string,
    leaseDuration?: string[],
    description?: string,
    area?:{
        width: number,
        length: number
    }
    contact?:{
        phone: string,
        whatsapp: string
    }
}
interface step2Values {
    city?: string | undefined,
    neighborhood?: string | undefined,
    state?: string | undefined,
    zip?: string | undefined,
    lat?: number,
    lng?: number
}
interface step3Values {
    features?: string[],
    previews?: {
        main: string | null,
        top: string | null,
        small1: string | null,
        small2: string | null,
    },
    images?: {
        main: string | undefined,
        top: string | undefined,
        small1: string | undefined,
        small2: string | undefined,
    }
}

export default function PostPerperty(){
    const [current, setCurrent] = useState(0);
    const [loading, setLoading]=useState<boolean>(false);
    const [step1Data, setStep1Data] = useState<step1Values|null>(null);
    const [step2Data, setStep2Data] = useState<step2Values|null>(null);
    const [step3Data, setStep3Data] = useState<step3Values|null>(null);

    const done = async () => {
        // console.log("step 1 data from parent",step1Data);
        // console.log("step 2 data from parent",step2Data);
        // console.log("step 3 data from parent",step3Data);
        // console.log({...step1Data,...step2Data,...step3Data});
        if(step3Data?.images!=undefined&&step3Data?.images.main!=undefined&&step3Data?.images.top!=undefined&&
            step3Data?.images.small1!=undefined&& step3Data?.images.small2!=undefined){
            setLoading(true);
            const uploaders = Object.entries(step3Data?.images).map(img=>uploadImgs(img[1]));
            axios.all(uploaders).then(res=>{
                const imgsURL = res.map(img=>({
                    cloudId:img.data.asset_id,
                    url:img.data.secure_url
                }));
                // console.log(res);
                // console.log(imgsURL);
                handleSubmit(imgsURL);
            }).catch(err=>{
                setLoading(false);
                message.error(`Something wrong in upload images ${err}`);
            })
        } else {
            message.warning("Please upload 3 photos");
        }
    }

    const handleSubmit = async (imgsURL:{cloudId:string,url:string}[]) => {
        try {
            const res = await axios.post("/api/property/post",{
                title: step1Data?.title,
                type: step1Data?.type,
                category: step1Data?.category,
                area: step1Data?.area,
                rooms: step1Data?.rooms,
                bedrooms: step1Data?.bedrooms,
                bathrooms: step1Data?.bathrooms,
                kitchen: step1Data?.kitchen,
                furnishingStatus: step1Data?.furnishingStatus,
                leaseDuration: step1Data?.leaseDuration,
                contact: step1Data?.contact,
                description: step1Data?.description,
                state: step2Data?.state,
                city: step2Data?.city,
                zip: step2Data?.zip,
                neighborhood: step2Data?.neighborhood,
                map: {
                    lat: step2Data?.lat,
                    lng: step2Data?.lng
                },
                features: step3Data?.features,
                imgs: imgsURL
            },{withCredentials: true});
            console.log(res);
            setLoading(false);
            message.success('Post has been posted!');
        } catch(err){
            // console.log(err);
            setLoading(false);
            message.error(`Something wrong ${err}`);
        }
    }

    const uploadImgs = (img: any) => {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", import.meta.env.VITE_PRESET);
        return axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD}/image/upload/`, formData).then((res)=>res).catch(err=>err);
    }

    const steps = [
        {
            title: 'Details',
            content: <Step1
                data={step1Data}
                setData={setStep1Data}
                next={()=>setCurrent(current + 1)}
            />,
        },
        {
            title: 'Location',
            content: <Step2
                data={step2Data}
                setData={setStep2Data}
                next={()=>setCurrent(current + 1)}
                prev={()=>setCurrent(current - 1)}
            />,
        },
        {
            title: 'Images/Features',
            content: <Step3
                done={done}
                prev={()=>setCurrent(current - 1)}
                data={step3Data}
                setData={setStep3Data}
                loading={loading}
            />,
        }, 
    ];

    return (
        <div id="post-property">
            <Steps current={current} items={steps.map((step) => ({ key: step.title, title: step.title }))} />
            <div className="steps">
                {steps[current].content}
            </div>
        </div>
    )
}