import { CSSProperties, useState } from "react";
import "./post-property.scss"

import { Button, message, Steps, theme } from 'antd';

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";


const steps = [
    {
        title: 'Details',
        content: <Step1 />,
    },
    {
        title: 'Location',
        content: <Step2 />,
    },
    {
        title: 'Images/Features',
        content: <Step3 />,
    }, 
];

export default function PostPerperty(){
    // Steps
    const [current, setCurrent] = useState(0);
    // const { token } = theme.useToken();
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    // const contentStyle: CSSProperties = {
    //     lineHeight: '260px',
    //     textAlign: 'center',
    //     color: token.colorTextTertiary,
    //     backgroundColor: token.colorFillAlter,
    //     borderRadius: token.borderRadiusLG,
    //     border: `1px dashed ${token.colorBorder}`,
    //     marginTop: 16,
    // };

    return (
        <div id="post-property">
            <Steps current={current} items={steps.map((step) => ({ key: step.title, title: step.title }))} />
            <div className="steps">
                {steps[current].content}
            </div>
            <div className="btns">
                {current > 0 && (
                    <Button onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
            </div>
        </div>
    )
}