import "./style.scss"
import { useState } from 'react';
import axios from "axios";
import type { UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Form, Input, Select, Button, Flex, message, Upload, Avatar } from 'antd';
import {StateCity} from "../../Data/state-municipality.ts";
import { useUser } from "../../context/userContext.tsx";
// Icons
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";




type stateCityType = { value: string; label: string }[];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function SetupProfile(){
    // User Context
    const {user,userDetails} = useUser();
    // Upload PFP
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

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
    // Form
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleFormSubmit = async (values: { state: string; city: string }) => {
        if (fileToUpload) {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", fileToUpload);
            formData.append("upload_preset", import.meta.env.VITE_PRESET);
            try {
                const responseCloud = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD}/image/upload/`, formData);
                if(responseCloud.status==200){
                    // console.log(responseCloud);
                    const fullData = {
                        state: capitalize(values.state),
                        city: capitalize(values.city),
                        photo: responseCloud.data.secure_url,
                        pfpId: responseCloud.data.asset_id
                    };
                    // console.log(fullData);
                    const resServer = await axios.put("/api/auth/setupProfile",{
                        ...fullData, id: user.id
                    },{withCredentials: true})
                    if(resServer.status!=200){
                        throw new Error('Something went wrong! Try again');
                    }
                    userDetails();
                    setUploading(false);
                    messageApi.open({
                        type: 'success',
                        content: "Your profile is ready 👏",
                    });
                } else{
                    throw new Error('Something went wrong! Try again');
                }
            } catch (err) {
                // console.error("Error uploading to Cloudinary:", error);
                setUploading(false);
                messageApi.open({
                    type: 'error',
                    content: `${err as string}`,
                });
            }
        }
    };
    // Handle Select
    const [delegations, setDelegations] = useState<stateCityType>([]);
    const stateOptions = StateCity.map(state => ({
        value: capitalize(state.Name),
        label: capitalize(state.Name),
    }));
    const handleStateChange = (value: string) => {
        const state = StateCity.find((s) => capitalize(s.Name) === value);
        setDelegations(state ?state.Delegations.map((d) => ({ value: d.Value, label: capitalize(d.Name) })) :[]);
    };

    return (
        <div className="setup-profile">
            {contextHolder}
            <div className="pfp">
                <Avatar src={imageUrl} />
                <ImgCrop rotationSlider>
                    <Upload
                        showUploadList={false}
                        onChange={onChange}
                        className={imageUrl ?"edit":""}
                    >
                    {imageUrl==null && <div className="up"><FaCloudUploadAlt /></div>}
                    {imageUrl && <div className="edit"><RiImageEditLine /></div>}
                    </Upload>
                </ImgCrop>
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                >
                <Flex gap={15} vertical>
                    <Flex gap={15}>
                        <Form.Item style={{ flex: 1 }} label="Username" >
                            <Input value={user?.username} disabled/>
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} label="Email" >
                            <Input value={user?.email} disabled />
                        </Form.Item>
                    </Flex>
                    <Flex gap={15}>
                        <Form.Item
                            name={"state"}
                            style={{ flex: 1 }}
                            label="State" rules={[{ type: 'string', required: true, message: "Please choose your state" }]}>
                            <Select
                                placeholder="choose your state"
                                options={stateOptions}
                                onChange={handleStateChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name={"city"}
                            style={{ flex: 1 }}
                            label="City" rules={[{ type: 'string', required: true, message: "Please choose your city" }]}>
                            <Select
                                placeholder="choose your city"
                                // disabled={!selectedState}
                                options={delegations}
                            />
                        </Form.Item>
                    </Flex>
                    <Flex gap={15}>
                        <Form.Item style={{ flex: 1 }}>
                            <Button htmlType="submit" block loading={uploading}>
                                {uploading ?'' : "Save"}
                            </Button>
                        </Form.Item>
                    </Flex>
                </Flex>
            </Form>
        </div>
    )
}