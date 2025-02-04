import "./style.scss"
import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Form, Input, Select, Button, Flex, message, Upload, Avatar, UploadProps } from 'antd';
import {StateCity} from "../../Data/stateCity.ts";
import { useUser } from "../../context/userContext.tsx";
import { uploadCloud } from "../../API/cloudinary.ts";
import { setupProfile } from "../../API/auth.ts";

// Icons
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


type stateCityType = { value: string; label: string }[];


const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


export default function SetupProfile(){
    const navigate = useNavigate();
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
    const handleFormSubmit = async (values: { state: string, city: string, phone: string, whatsapp: number }) => {
        if(!fileToUpload){
            message.error("Please upload profile photo");
            return;
        }
        setLoading(true);
        const upPfp:any = await uploadCloud(fileToUpload);
        if(upPfp.status!=200){
            setLoading(false);
            message.error("There is problem in profile photo, try again :)");
            return;
        }
        let fullData:any = {
            state: capitalize(values.state),
            city: capitalize(values.city),
            photo: upPfp.data.secure_url,
            pfpId: upPfp.data.asset_id
        };
        if(values.phone){
            fullData = {...fullData, phone:values.phone};
        }
        if(values.whatsapp){
            fullData = {...fullData, whatsapp:values.whatsapp};
        }
        const setupRes:any = await setupProfile(fullData);
        if(setupRes.status!=200){
            setLoading(false);
            message.error("Something wrong, try again :)");
            return;
        }
        setLoading(false);
        message.success("Your profile completed");
        setTimeout(()=>{
            userDetails();
            navigate("/");
        },2000);
    };

    return (
        <div className="setup-profile">
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