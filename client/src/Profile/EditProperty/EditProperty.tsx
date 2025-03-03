// import { Steps } from "antd";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Step1 from "../Post-Property/steps/step1";
// import Step2 from "../Post-Property/steps/step2";
// import Step3 from "../Post-Property/steps/step3";


export default function EditProperty() {
    // const location = useLocation();
    // const [current, setCurrent] = useState<number>(0);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [done, setDone] = useState<boolean>(false);
    // const [stepData, setStepData] = useState<any>({
    //     step1: {},
    //     step2: {},
    //     step3: {}
    // });

    // useEffect(()=>{
    //     console.log(location?.state?.id);
    // },[location])
    return (
        <div className="test">
            {/* <Steps current={current} items={[
                    {
                        title: 'Details',
                        content: <Step1
                            data={stepData.step1}
                            next={()=>setCurrent(current + 1)}
                        />,
                    },
                    {
                        title: 'Location',
                        content: <Step2
                            data={stepData.step2}
                            next={()=>setCurrent(current + 1)}
                            prev={()=>setCurrent(current - 1)}
                        />,
                    },
                    {
                        title: 'Images/Features',
                        content: <Step3
                            done={done}
                            prev={()=>setCurrent(current - 1)}
                            data={stepData.step3}
                            setData={setStep3Data}
                            loading={loading}
                        />,
                    }, 
                ]}
            /> */}
        </div>
    )
} 