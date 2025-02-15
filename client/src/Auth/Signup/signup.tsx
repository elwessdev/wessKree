import "./signup.scss"
import {Form,Input,Button,message, Spin} from "antd";
import {NavLink, useNavigate} from "react-router-dom"
import { useUser } from "../../hooks/userContext";
import { useState } from "react";
import { checkEmail, checkUsername, signup } from "../../API/auth";

// Icons
import { TbLockPassword } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LoadingOutlined } from '@ant-design/icons';
import { LuUserCheck } from "react-icons/lu";
import { VscQuestion } from "react-icons/vsc";




export default function Signup(){
    const navigate = useNavigate();
    const [loading, setLoading]=useState<boolean>(false);
    const [form] = Form.useForm();
    const {userDetails} = useUser();

    // Handle Signup
    const handleSignup = async (values: { 
        username: string,
        publicName:string,
        email: string,
        password: string
    }) => {
        setLoading(true);
        const checkUsernameRes:any = await checkUsername(values.username);
        if(checkUsernameRes.status==200){
            setLoading(false);
            form.setFields([{
                name: "username",
                errors: ["Username is exist"]
            }]);
            return;
        }
        const checkEmailRes:any = await checkEmail(values.email);
        if(checkEmailRes.status==200){
            setLoading(false);
            form.setFields([{
                name: "email",
                errors: ["Email is exist"]
            }]);
            return;
        }
        console.log(values);
        const signupRes:any = await signup(values.username,values.publicName,values.email,values.password);
        if(signupRes.status == 200){
            setLoading(false);
            message.success("Signup successfully");
            userDetails();
            navigate("/setup-profile");
            return;
        } else {
            setLoading(false);
            message.error(`Something went wrong! Try again`);
            return;
        }
    }

    return (
        <div className="signup">
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
                        rules={[
                            { required: true, message: "- Username is required" },
                            { min: 5, message: "- Username must be at least 5 characters" },
                            { max: 10, message: "- Username cannot exceed 10 characters" },
                            { 
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: "- Only letters, numbers, and underscores are allowed"
                            },
                        ]}
                        >
                        <Input size="large" placeholder="Enter your username" prefix={<LuUserCheck />} />
                    </Form.Item>
                    <Form.Item
                        label="Public Name"
                        name="publicName"
                        tooltip={{ title: 'Public name it will display in your profile', icon: <VscQuestion /> }}
                        rules={[
                            { required: true, message: "- Public Name is required" },
                            { min: 5, message: "- Public Name must be at least 5 characters" },
                            { max: 15, message: "- Public Name cannot exceed 15 characters" },
                        ]}
                    >
                        <Input size="large" placeholder="Enter your username" prefix={<FaRegUserCircle />} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "- Email is required" },
                            { 
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "- Email format is not valid"
                            },
                        ]}
                    >
                        <Input size="large" type="email" placeholder="Enter your email" prefix={<MdOutlineAlternateEmail />} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {required: true, message: '- Password is required'},
                            { min: 5, message: "- Username must be at least 5 characters" },
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
                            {required: true, message: '- Confirm password is required'},
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