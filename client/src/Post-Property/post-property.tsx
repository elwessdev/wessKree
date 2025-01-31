import "./post-property.scss"
import { useState } from "react";
import { Button, message, Steps } from 'antd';
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";

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
    neighborhood: string | undefined,
    state?: string | undefined,
    zip?: string | undefined
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
        main: string | null,
        top: string | null,
        small1: string | null,
        small2: string | null,
    }
}

export default function PostPerperty(){
    // Steps
    const [current, setCurrent] = useState(2);
    const [step1Data, setStep1Data] = useState<step1Values|null>(null);
    const [step2Data, setStep2Data] = useState<step2Values|null>(null);
    const [step3Data, setStep3Data] = useState<step3Values|null>(null);


    const done = () => {
        message.success('Processing complete!')
    }

    const dt = () => {
        console.log("step 1 data from parent",step1Data);
        console.log("step 2 data from parent",step2Data);
        console.log("step 3 data from parent",step3Data);
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
            />,
        }, 
    ];

    return (
        <div id="post-property">
            <Steps current={current} items={steps.map((step) => ({ key: step.title, title: step.title }))} />
            <div className="steps">
                {steps[current].content}
            </div>
            <Button onClick={dt}>Log</Button>
        </div>
    )
}