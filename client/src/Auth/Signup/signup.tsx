import "./signup.scss"
import {Form,Input,Button,message, Spin} from "antd";
import {NavLink, useNavigate} from "react-router-dom"
import axios from "axios";
import { useUser } from "../../context/userContext";
import { useState } from "react";

// Icons
import { TbLockPassword } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LoadingOutlined } from '@ant-design/icons';



export default function Signup(){
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading]=useState<boolean>(false);
    const [form] = Form.useForm();
    const {userDetails} = useUser();

    // Handle Signup
    const handleSignup = async (values: { username: string; email: string, password: string,  }) => {
        setLoading(true);
        try{
            const res = await axios.post("/api/auth/signup",{
                username: values.username,
                email: values.email,
                password: values.password
            })
            // console.log(res);
            if(res.status == 200){
                userDetails();
                navigate("/setup-profile");
            } else {
                throw new Error('Something went wrong! Try again');
            }
            setLoading(false);
        } catch(err){
            setLoading(false);
            messageApi.open({
                type: 'error',
                content: `Something went wrong! Try again`,
            });
        }
    }

    return (
        <div className="signup">
            {contextHolder}
            <div className="r-s">
                <h3>Sign up</h3>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSignup}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input size="large" placeholder="Enter your username" prefix={<FaRegUserCircle />} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ type: 'email', required: true, message: "Please input your email!" }]}
                    >
                        <Input size="large" type="email" placeholder="Enter your email" prefix={<MdOutlineAlternateEmail />} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                            // min: 6
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Enter password" prefix={<TbLockPassword />} />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Enter confirm password" prefix={<TbLockPassword />} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" block>
                            {loading ?<Spin indicator={<LoadingOutlined spin />} /> :"Signup"}
                        </Button>
                    </Form.Item>
                    <p className="lnk">
                        Already have an account ? 
                        <NavLink to={"/signup"}>Sign in</NavLink>
                    </p>
                </Form>
            </div>
            <div className="l-s">
                <div className="txt">
                    <h3>Welcome to wessKree</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos recusandae beatae saepe consectetur ut illum expedita modi excepturi, ab obcaecati et commodi blanditiis officia nesciunt consequatur est consequuntur. Quasi, exercitationem!</p>
                </div>
            </div>
        </div>
    )
}