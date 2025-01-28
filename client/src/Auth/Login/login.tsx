import "./login.scss"
import { FC, memo } from 'react';
import { NavLink } from "react-router-dom";
import { Modal,Input,Form,Button,Checkbox } from 'antd';
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";


interface props {
    open: boolean,
    cancel: (val: boolean) => void
}

const Login: FC<props> = ({open,cancel}) => {
    const [form] = Form.useForm();

    const handleFinish = (values: { username: string; password: string }) => {
        console.log("Login values:", values);
        form.resetFields();
    };

    const handleKeepMe = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

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
                    rules={[{ required: true, message: "Please input your email!" }]}
                >
                    <Input size="large" placeholder="Enter your email" prefix={<MdOutlineAlternateEmail />} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    className="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input size="large" placeholder="Enter your password" prefix={<TbLockPassword />} />
                </Form.Item>
                <Form.Item
                    name="keepLogin"
                    className="check"
                >
                    <Checkbox onChange={handleKeepMe}>
                        Keep me logged in
                    </Checkbox>
                        <NavLink to={"/forgot-password"} className="lnkP">Forgot Password ?</NavLink>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
                <p className="lnk">
                    Don't have an account ? 
                    <NavLink to={"/signup"} onClick={()=>cancel(false)}>Sign up</NavLink>
                </p>
            </Form>
        </Modal>
    )
}

export default memo(Login);