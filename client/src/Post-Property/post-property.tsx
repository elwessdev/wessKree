import "./post-property.scss"
import { useState } from "react";
import { Button, message, Steps } from 'antd';
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";


export default function PostPerperty(){
    // Steps
    const [current, setCurrent] = useState(1);
    
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const done = () => {
        message.success('Processing complete!')
    }

    const steps = [
        {
            title: 'Details',
            content: <Step1 next={next} />,
        },
        {
            title: 'Location',
            content: <Step2 next={next} prev={prev} />,
        },
        {
            title: 'Images/Features',
            content: <Step3 done={done} prev={prev}/>,
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