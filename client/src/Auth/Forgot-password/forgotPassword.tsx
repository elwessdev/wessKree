import "./style.scss";
import { useForm } from "antd/es/form/Form";
import { Button, Form, GetProps, Input, message, Spin } from "antd";
import { useState } from "react";
import { sendCode } from "../../API/auth";


import { MdOutlineEmail } from "react-icons/md";
import { LoadingOutlined } from "@ant-design/icons";

type OTPProps = GetProps<typeof Input.OTP>;


export default function ForgotPassword() {
    const [form] = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [otpStatus, setOtpStatus] = useState<boolean>(false);

    const handleForgotPassword = async(values: {email:string,otp:string}) => {
        if(!otpStatus&&values.email){
            setLoading(true);
            const resSendCode:any = await sendCode(values.email);
            if(resSendCode.status === 200){
                message.success("A reset code has been sent to your email. Please check your inbox and follow the instructions.")
                setLoading(false);
                setOtpStatus(true);
            } else {
                message.error("Failed to send reset code. Please try again.")
                setLoading(false);
            }
        }
    }

    const onChange: OTPProps['onChange'] = (text) => {
        console.log('OTP:', text);
    };

    return (
        <div className="forgot-password">
            <h3>Forgot password</h3>
            <p>Enter your email to receive a verification code and reset your password.</p>
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleForgotPassword}
            >
                <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                        { required: true},
                        { 
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email format is not valid"
                        },
                    ]}
                >
                    <Input disabled={otpStatus} size="large" placeholder="Email Address" prefix={<MdOutlineEmail />} />
                </Form.Item>
                {otpStatus && (
                    <Form.Item
                        className="otp"
                        label="Enter OTP Code"
                        name="otp"
                        style={{textAlign: "center", marginTop: "25px"}}
                        rules={[
                            { required: true},
                            { 
                                pattern: /^[a-zA-Z0-9]{6}$/,
                                message: "OTP format is not valid"
                            },
                        ]}
                    >
                        <Input.OTP formatter={(str) => str.toUpperCase()} onChange={onChange} />
                    </Form.Item>
                )}
                <Form.Item>
                    {!otpStatus 
                        ?<Button htmlType="submit" block type="primary" size="large" style={{width: "100%", margin: "0 auto"}}>
                            {loading ?<Spin indicator={<LoadingOutlined spin />} /> :"Signup"}
                        </Button>
                        :<Button htmlType="submit" block type="primary" size="large" style={{width: "200px", margin: "5px auto 0 auto", display: "block"}}>
                            {loading ?<Spin indicator={<LoadingOutlined spin />} /> :"Verify OTP"}
                        </Button>
                    }
                </Form.Item>
            </Form>

        </div>
    )
}