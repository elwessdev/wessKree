import "./style.scss"
import { FC, memo, useState } from 'react';
import { NavLink } from "react-router-dom";
import { Modal,Input,Form,Button,Checkbox,Spin,message } from 'antd';
// import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useUser } from "../../hooks/userContext";
import { signin, signWithGoogle } from "../../API/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";

// Icon
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { LoadingOutlined } from '@ant-design/icons';


interface props {
    open: boolean,
    cancel: (val: boolean) => void
}

const Login: FC<props> = ({open,cancel}) => {
    const {userDetails} = useUser();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const [loading, setloading] = useState<boolean>(false);

    const handleFinish = async (values: { username: string; password: string; keepLogin:boolean }) => {
        // console.log("Login values:", values);
        setloading(true);
        try{
            const res:any = await signin(values);
            if(res.status==200){
                setloading(false);
                queryClient.invalidateQueries({queryKey: ["homeProperties"]});
                userDetails();
                cancel(false);
                form.resetFields();
            } else {
                form.setFields([
                    {
                        name: "password",
                        errors:["Email/Password incorrect"]
                    },
                    {
                        name: "email",
                        errors:[""]
                    },
                ])
                setloading(false);
            }
        } catch(err){
            console.log(err);
            setloading(false);
            message.error(`Something went wrong! Try again`);
        }
    };

    const handleLoginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res:any = await signWithGoogle(tokenResponse.access_token)
                if(res.status==200){
                    queryClient.invalidateQueries({queryKey: ["homeProperties"]});
                    userDetails();
                    cancel(false);
                } else {
                    message.error("Something went wrong! Try again");
                }
            } catch (err) {
                console.log(err);
            }
        },
        onError: (error) => {
            console.error('Login Failed:', error);
        },
    });

    return (
        <Modal
            title="Sign in"
            className="login"
            open={open}
            onCancel={()=>cancel(false)}
            footer={null} // Remove default footer buttons
            >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please enter email!" }]}
                >
                    <Input size="large" placeholder="Enter your email" prefix={<MdOutlineAlternateEmail />} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    className="password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter password!',
                        }
                    ]}
                >
                    <Input.Password size="large" placeholder="Enter your password" prefix={<TbLockPassword />} />
                </Form.Item>
                <Form.Item
                    name="keepLogin"
                    className="check"
                    initialValue={false}
                    valuePropName="checked"
                >
                    <div>
                        <Checkbox>
                            Keep me logged in
                        </Checkbox>
                        <NavLink to={"/forgot-password"} onClick={()=>cancel(false)} className="lnkP">Forgot Password ?</NavLink>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" block>
                        {loading ?<Spin indicator={<LoadingOutlined spin />} /> :"Login"}
                    </Button>
                </Form.Item>
                <div className="dvider"><span>Or Access Quickly</span></div>
                <div className="google-button" onClick={()=>handleLoginWithGoogle()}>
                    <div className="google-icon-wrapper">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48">
                        <g>
                            <path fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                            </path>
                            <path fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                            </path>
                            <path fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                            </path>
                            <path fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                            </path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                        </g>
                        </svg>
                    </div>
                    <p className="google-button-text">Sign in with Google</p>
                </div>
                <p className="lnk">
                    Don't have an account ? 
                    <NavLink to={"/signup"} onClick={()=>cancel(false)}>Sign up</NavLink>
                </p>
            </Form>
        </Modal>
    )
}

export default memo(Login);