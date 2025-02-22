import "./style.scss";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, message, Spin } from "antd";
import { useState } from "react";
import { changePwd, sendCode, verifyOTP } from "../../API/auth";


import { MdOutlineEmail } from "react-icons/md";
import { LoadingOutlined } from "@ant-design/icons";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
    const [form] = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [otpStatus, setOtpStatus] = useState<string>("1step");
    const [data,setData] = useState<any>({});

    const handleForgotPassword = async(values: {email:string,otp:string,password:string,confirm:string}) => {
        if(otpStatus==="1step"&&values.email&&!loading){
            setLoading(true);
            const resSendCode:any = await sendCode(values.email);
            if(resSendCode.status === 200){
                setData({email:values.email});
                message.success("A reset code has been sent to your email. Please check your inbox and follow the instructions.")
                setOtpStatus("2step");
                setLoading(false);
            } else {
                message.error("Failed to send reset code. Please try again.")
                setLoading(false);
            }
        }
        if(otpStatus==="2step"&&values.otp&&!loading){
            // console.log("ee");
            setLoading(true);
            const resVreifyCode:any = await verifyOTP(values.email,values.otp);
            // console.log(resVreifyCode);
            if(resVreifyCode.status === 200){
                setData({...data,otp:values.otp});
                values.otp = "";
                message.success("OTP is valid. You can now reset your password.");
                setOtpStatus("3step");
            } else if(resVreifyCode.status === 400){
                form.setFields([
                    {
                        name: "otp",
                        errors: [resVreifyCode.response.data.message]
                    }
                ]);
            } else {
                message.error("Failed to verify OTP. Please try again.");
            }
            setLoading(false);
        }
        if(otpStatus==="3step"&&values.password&&!loading){
            if(values.password!=values.confirm){
                form.setFields([
                    {
                        name: "confirm",
                        errors: ["Passwords do not match"]
                    }
                ]);
                return;
            }
            setLoading(true);
            if(!data.email&&!data.otp){
                message.error("Please enter your email and OTP code first.");
                setOtpStatus("1step");
                setLoading(false);
                return;
            }
            const changePwdRes:any = await changePwd(data.email,data.otp,values.password);
            // console.log(changePwdRes);
            if(changePwdRes.status === 200){
                message.success("Password has been changed successfully. You can now login with your new password.");
                setData({});
                values.password = "";
                values.confirm = "";
                setTimeout(()=>navigate("/"),1300);
            } else if(changePwdRes.status === 400){
                message.error(changePwdRes.response.data.message);
                setData({});
                setTimeout(()=>setOtpStatus("1step"),600);
            } else {
                message.error("Failed to change password. Please try again.");
            }
            setLoading(false);
        }
    }

    return (
        <div className="forgot-password">
            <h3>Forgot password</h3>
            {otpStatus==="1step"||otpStatus==="2step" && <p>Enter your email to receive a verification code and reset your password.</p>}
            {otpStatus==="3step" && <p>Change password</p>}
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleForgotPassword}
            >
                {(otpStatus==="1step"||otpStatus==="2step") && (
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
                        <Input disabled={otpStatus!="1step"} size="large" placeholder="Email Address" prefix={<MdOutlineEmail />} />
                    </Form.Item>
                )}

                {otpStatus==="2step" && (
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
                        <Input.OTP />
                    </Form.Item>
                )}

                {otpStatus==="3step" && (
                    <>
                        <Form.Item
                            name="password"
                            label="New Password"
                            rules={[
                                {required: true, message: 'Password is required'},
                                { min: 5, message: "Password must be at least 5 characters" },
                            ]}
                            hasFeedback
                        >
                            <Input.Password size="large" placeholder="Enter password" prefix={<TbLockPassword />} />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {required: true, message: 'Confirm password is required'},
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size="large" placeholder="Enter confirm password" prefix={<TbLockPassword />} />
                        </Form.Item>
                    </>
                )}

                <Form.Item>
                {otpStatus==="1step" && (
                    <Button htmlType="submit" block type="primary" size="large" style={{width: "100%", margin: "0 auto"}}>
                        {loading ?<Spin indicator={<LoadingOutlined spin />} /> :"Send code"}
                    </Button>
                )}
                {otpStatus==="2step" && (
                    <Button htmlType="submit" block type="primary" size="large" style={{width: "200px", margin: "5px auto 0 auto", display: "block"}}>
                        {loading ?<Spin indicator={<LoadingOutlined spin />} /> :"Verify OTP"}
                    </Button>
                )}
                {otpStatus==="3step" && (
                    <Button htmlType="submit" block type="primary" size="large" style={{width: "200px", margin: "5px auto 0 auto", display: "block"}}>
                        {loading ?<Spin indicator={<LoadingOutlined spin />} /> :"Save"}
                    </Button>
                )}
                </Form.Item>
            </Form>
        </div>
    )
}