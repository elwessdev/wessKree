import "./signup.scss"
import {Form,Checkbox,Input,Button} from "antd";
import {NavLink} from "react-router-dom"

import { TbLockPassword } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";


export default function Signup(){
    const [form] = Form.useForm();

    const handleFinish = (values: { username: string; password: string }) => {
        console.log("Login values:", values);
        form.resetFields();
    };

    return (
        <div className="signup">
            <div className="r-s">
                <h3>Sign up</h3>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
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
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input size="large" type="email" placeholder="Enter your email" prefix={<MdOutlineAlternateEmail />} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input size="large" type="password" placeholder="Enter password" prefix={<TbLockPassword />} />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirm-password"
                        className="lst"
                        rules={[{ required: true, message: "Please input your confirm password!" }]}
                    >
                        <Input size="large" type="password" placeholder="Enter confirm password" prefix={<TbLockPassword />} />
                    </Form.Item>
                    {/* <Form.Item
                        name="keepLogin"
                        className="check"
                    >
                        <Checkbox>Keep me logged in</Checkbox>
                    </Form.Item> */}
                    <Form.Item>
                        <Button htmlType="submit" block>
                            Signup
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