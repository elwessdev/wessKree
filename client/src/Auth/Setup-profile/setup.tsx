import "./style.scss"
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Form, Input, Select, Button, Flex, message, Upload, Avatar, UploadProps } from 'antd';
import {StateCity} from "../../Data/stateCity.ts";
import { useUser } from "../../hooks/userContext.tsx";
// import { uploadCloud } from "../../API/cloudinary.ts";
import { setupProfile } from "../../API/auth.ts";

// Icons
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { TbLockPassword } from "react-icons/tb";


type stateCityType = { value: string; label: string }[];


const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


export default function SetupProfile(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    // User Context
    const {user,userDetails} = useUser();

    // Upload PFP
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const onChange: UploadProps["onChange"] = ({ file }) => {
        if (file.status === "done" || file.originFileObj) {
            setFileToUpload(file.originFileObj as File);
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as Blob);
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
        }
    };

    useEffect(()=>{
        if(user?.photo?.length){
            setImageUrl(user.photo);
            console.log(user);
        }
    },[user]);

    // Handle Select
    const [delegations, setDelegations] = useState<stateCityType>([]);
    const stateOptions = StateCity.map(state => ({
        value: capitalize(state.Name),
        label: capitalize(state.Name),
    }));
    const handleStateChange = (value: string) => {
        form.setFieldsValue({city:null});
        const state = StateCity.find((s) => capitalize(s.Name) === value);
        setDelegations(state ?state.Delegations.map((d) => ({ value: d.Value, label: capitalize(d.Name) })) :[]);
    };

    // Form
    const handleFormSubmit = async (values: { 
        state: string,
        city: string,
        phone: string,
        whatsapp: number,
        password: string,
        confirm: string
    }) => {
        if(!user?.isGoogle&&!fileToUpload){
            message.error("Please upload profile photo");
            return;
        }
        setLoading(true);
        let fullData:any = {
            state: capitalize(values.state),
            city: capitalize(values.city),
        };
        if(fileToUpload){
            try {
                // const upPfp: any = await uploadCloud(fileToUpload);
                const formData = new FormData();
                formData.append("file", fileToUpload);
                formData.append("upload_preset", import.meta.env.VITE_PRESET);
                // formData.append("folder", "pfp");
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD}/image/upload/`, 
                    {
                        method: "POST",
                        body: formData,
                        credentials: "omit",
                    }
                );
                const data = await res.json();
                if (!data.secure_url) {
                    setLoading(false);
                    message.error("There is problem in profile photo, try again :)");
                    return;
                }
                fullData = {
                    ...fullData,
                    photo: data.secure_url,
                    pfpId: data.public_id
                };
            } catch {
                setLoading(false);
                message.error("There was an error uploading the profile photo, please try again.");
                return;
            }
        }

        let contactInfo:any = {};
        if(values.phone){
            contactInfo = {phone:values.phone}
        }
        if(values.whatsapp){
            contactInfo = {...contactInfo,whatsapp:values.whatsapp}
        }

        if(Object.entries(contactInfo).length){
            fullData = {...fullData,contact:contactInfo};
        }

        if(user?.isGoogle==true&&values.password){
            if(values.password!=values.confirm){
                setLoading(false);
                message.error("Passwords do not match");
                return;
            }
            fullData = {...fullData,password:values.password};
        }

        // console.log(fullData);

        const setupRes:any = await setupProfile(fullData);
        if(setupRes.status!=200){
            setLoading(false);
            message.error("Something wrong, try again :)");
            return;
        }
        message.success("Your profile completed");
        queryClient.invalidateQueries({queryKey: ["homeProperties"]});
        setLoading(false);
        setTimeout(()=>{
            userDetails();
            navigate("/");
        },1200);
        // console.log(fullData);
    };

    return (
        <div className="setup-profile">
            <div className="pfp">
                <Avatar src={user?.photo?.length ?user.photo :imageUrl} />
                <ImgCrop rotationSlider>
                    <Upload
                        showUploadList={false}
                        onChange={onChange}
                        className={imageUrl ?"edit":""}
                    >
                    {user?.photo?.length
                        ? <div className="edit"><RiImageEditLine /></div>
                        : <div className="up"><FaCloudUploadAlt /></div>
                    }
                    </Upload>
                </ImgCrop>
            </div>
            <Form
                form={form}
                layout="vertical"
                requiredMark={"optional"}
                onFinish={handleFormSubmit}
                >
                <Flex gap={15} vertical>
                    <Flex gap={15}>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Public name"
                            required
                        >
                            <Input value={user?.publicName} disabled/>
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Email"
                            required
                        >
                            <Input value={user?.email} disabled />
                        </Form.Item>
                    </Flex>
                    <Flex gap={15}>
                        <Form.Item
                            name="state"
                            style={{ flex: 1 }}
                            label="State" rules={[{ type: 'string', required: true, message: "Please choose your state" }]}>
                            <Select
                                placeholder="choose your state"
                                options={stateOptions}
                                onChange={handleStateChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="city"
                            style={{ flex: 1 }}
                            label="City" rules={[{ type: 'string', required: true, message: "Please choose your city" }]}>
                            <Select
                                placeholder="choose your city"
                                options={delegations}
                            />
                        </Form.Item>
                    </Flex>
                    {user?.isGoogle==true &&
                        <Flex gap={15}>
                            <Form.Item
                                name="password"
                                label="Password"
                                style={{ flex: 1 }}
                                rules={[
                                    {required: true, message: '- Password is required'},
                                    { min: 5, message: "- Password must be at least 5 characters" },
                                ]}
                                hasFeedback
                            >
                                <Input.Password size="large" placeholder="Enter password" prefix={<TbLockPassword />} />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                style={{ flex: 1 }}
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
                        </Flex>
                    }
                    <Flex gap={15}>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Phone number"
                            name="phone"
                            rules={[
                                {min:8, message: "Number format is not valid"},
                                {max:8, message: "Number format is not valid"}
                            ]}
                        >
                            <Input type="number" placeholder="Enter phone number here" />
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Whatsapp number"
                            name="whatsapp"
                            rules={[
                                {min:8, message: "Number format is not valid"},
                                {max:8, message: "Number format is not valid"}
                            ]}
                        >
                            <Input type="number" placeholder="Enter whatsapp number here" />
                        </Form.Item>
                    </Flex>
                    <Flex gap={15}>
                        <Form.Item style={{ flex: 1 }}>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                {loading ?'' : "Save"}
                            </Button>
                        </Form.Item>
                    </Flex>
                </Flex>
            </Form>
        </div>
    )
}