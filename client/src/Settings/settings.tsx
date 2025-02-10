import "./style.scss"
import { useEffect, useState } from "react";
import ImgCrop from 'antd-img-crop';
import { Form, Input, Select, Button, Flex, message, Upload, Avatar, UploadProps, Spin, Space } from 'antd';
import {StateCity} from "../Data/stateCity.ts";
import { useUser } from "../context/userContext.tsx";
import { checkEmail, checkPwd } from "../API/auth.ts";

// Icons
// import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { deleteCloud, uploadCloud } from "../API/cloudinary.ts";
import { updateProfile } from "../API/user.ts";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

// Type
type stateCityType = { value: string; label: string }[];
type values = {
    username: string | undefined,
    publicName: string,
    email: string,
    state: string,
    city: string,
    currentPassword: string | undefined,
    newPassword: string | undefined,
    confirmNewPassword: string | undefined,
    contact: {
        phone: string | undefined,
        whatsapp: string | undefined
    }
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function Settings(){
    const {user} = useUser();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const [imageUrl, setImageUrl] = useState<string | null | any>(null);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    
    // Select
    const [delegations, setDelegations] = useState<stateCityType>([]);
    const stateOptions = StateCity.map(state => ({
        value: capitalize(state.Name),
        label: capitalize(state.Name),
    }));
    const handleStateChange = (value: string) => {
        form.setFieldsValue({ city: null });
        const state = StateCity.find((s) => capitalize(s.Name) === value);
        setDelegations(state ?state.Delegations.map((d) => (
            { value: capitalize(d.Value), label: capitalize(d.Name) }
        )) :[]);
    };
    useEffect(()=>{
        form.setFieldsValue({ state: user?.state, city: user?.city });
        const stateIf:any = StateCity.find((s) => capitalize(s.Name) === user?.state);
        setDelegations(
            stateIf?.Delegations.map((d:any) =>(
                { value: capitalize(d.Value), label: capitalize(d.Name) }
            ))
        );
        setImageUrl(user?.photo);
    },[user]);
    
    // PFP
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

    // Submit
    const handleFormSubmit = async(values:values) => {
        // console.log(values);
        if(values.currentPassword){
            let newData:any = {};
            const checkPwdRes:any = await checkPwd(values.currentPassword);
            if(checkPwdRes.status!=200){
                await form.setFields([{
                    name: 'currentPassword',
                    errors:  ["Password is incorrect"],
                }]);
                return;
            }

            if(fileToUpload){
                const deleteCloudRes:any = await deleteCloud(user?.pfpId);
                console.log(deleteCloudRes);
                if(!deleteCloudRes.success){
                    message.error("Something wrong in change profile picture, Try again");
                    return;
                }
                const upToCloud:any = await uploadCloud(fileToUpload);
                if(upToCloud.status!=200){
                    message.error("Something wrong in change profile picture, Try again");
                    return;
                }
                newData = {
                    ...newData,
                    photo: upToCloud.data.secure_url,
                    pfpId: upToCloud.data.public_id
                }
            }
            
            const contactData:any = user?.contact;
            if (values.contact.phone !== user?.contact?.phone) {
                contactData.phone = values.contact.phone;
            }
            if (values.contact.whatsapp !== user?.contact?.whatsapp) {
                contactData.whatsapp = values.contact.whatsapp;
            }
            if(Object.entries(contactData).length){
                newData = {...newData,contact:contactData};
            }

            if(values.newPassword && values.confirmNewPassword){
                if(values.newPassword != values.confirmNewPassword){
                    form.setFields([{
                        name: "confirmNewPassword",
                        errors: ["Passwords do not match"]
                    }]);
                    return;
                }
                newData = {...newData, password: values.newPassword};
            }
            if(values.publicName && values.publicName!=user?.publicName){
                newData = {...newData, publicName: values.publicName};
            }
            if(values.email && values.email!=user?.email){
                const checkMailRes:any = await checkEmail(values.email);
                // console.log(checkMailRes);
                if(checkMailRes.status==200){
                    form.setFields([{
                        name:"email",
                        errors: ["This email is used at other account"]
                    }])
                    return;
                }
                newData = {...newData, email: values.email};
            }
            if(values.state && values.state!=user?.state){
                newData = {...newData, state: values.state};
            }
            if(values.city && values.city!=user?.city){
                newData = {...newData, city: values.city};
            }
            if(Object.keys(newData).length > 0){
                setLoading(true);
                const updatePfRes:any = await updateProfile(newData);
                if(updatePfRes.status!=200){
                    setLoading(false);
                    message.error("Something wrong when update profile, Try again");
                    return;
                }
                // console.log(newData);
                message.success("You profile has been updated");
                setLoading(false);
            }
            console.log(newData);
            setLoading(false);
        }
        return;
    }
    return (
        <div id="settings">
            {!user ?(
                <Spin size="large" />
            ): (
                <>
                    <div className="pfp">
                        <Avatar src={imageUrl} />
                        <ImgCrop rotationSlider>
                            <Upload
                                showUploadList={false}
                                onChange={onChange}
                                className={"edit"}
                            >
                                {/* {imageUrl==null && <div className="up"><FaCloudUploadAlt /></div>} */}
                                {/* {imageUrl && <div className="edit"><RiImageEditLine /></div>} */}
                                <div className="edit"><RiImageEditLine /></div>
                            </Upload>
                        </ImgCrop>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        requiredMark={false}
                        onFinish={handleFormSubmit}
                        >
                        <Flex gap={15} vertical>
                            <Flex gap={15}>
                                <Form.Item
                                    style={{flex: 1}}
                                    label="Username"
                                    name={"username"}
                                    initialValue={user?.username}
                                >
                                    <Input disabled/>
                                </Form.Item>
                                <Form.Item
                                    style={{flex: 1}}
                                    label="Public name"
                                    name={"publicName"}
                                    initialValue={user?.publicName}
                                    rules={[
                                        { required: true, message: "Please Enter Public Name" },
                                        { min: 5, message: 'Public name must be at least 5 characters!' },
                                    ]}
                                    >
                                        <Input placeholder="Enter Public name" />
                                </Form.Item>
                            </Flex>
                            <Flex gap={15}>
                                <Form.Item
                                    label="State"
                                    name={"state"}
                                    style={{flex: 1}}
                                    initialValue={user?.state}
                                    rules={[
                                        { required: true, message: "Please Choose State" }
                                    ]}
                                >
                                    <Select
                                        placeholder="choose your state"
                                        options={stateOptions}
                                        onChange={handleStateChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="City"
                                    name={"city"}
                                    style={{flex: 1}}
                                    initialValue={user?.city}
                                    rules={[{ required: true, message: "Please Choose City" }]}
                                >
                                    <Select
                                        placeholder="choose your city"
                                        // disabled={!selectedState}
                                        options={delegations}
                                    />
                                </Form.Item>
                            </Flex>
                            <Flex>
                                <Form.Item
                                    style={{ flex: 1 }} 
                                    label="Contact"
                                    >
                                        <Space.Compact className='con' style={{ flex: 1, gap: 5, width: "100%" }}  >
                                            <Form.Item
                                                style={{ flex: 1 }} 
                                                name={["contact", "phone"]}
                                                initialValue={user?.contact.phone}
                                                rules={[
                                                    { min: 8, max: 8, message: 'Number format not valid' },
                                                ]}
                                            >
                                                <Input type="number" prefix={<MdPhone />} placeholder='Phone'/>
                                            </Form.Item>
                                            <Form.Item
                                                style={{ flex: 1 }} 
                                                name={["contact", "whatsapp"]}
                                                initialValue={user?.contact.whatsapp}
                                                rules={[
                                                    { min: 8, max: 8, message: 'Number format not valid' },
                                                ]}
                                            >
                                                <Input type="number" prefix={<FaWhatsapp />} placeholder='WhatsApp'/>
                                            </Form.Item>
                                        </Space.Compact>
                                </Form.Item>
                            </Flex>
                            <Flex gap={15}>
                                <Form.Item
                                    style={{flex: 1}}
                                    label="Email"
                                    name="email"
                                    initialValue={user?.email}
                                    rules={[
                                        { required: true, message: "Please Enter Email" }
                                    ]}
                                >
                                    <Input type="email" placeholder="Enter Email" />
                                </Form.Item>
                                <Form.Item
                                    style={{flex: 1}}
                                    name="currentPassword"
                                    label="Current Password"
                                    rules={[{ required: true, message: "Please Enter Password for save edits" }]}
                                >
                                    <Input.Password placeholder="Enter current password" />
                                </Form.Item>
                            </Flex>
                            <Flex gap={15}>
                                <Form.Item
                                    style={{flex: 1}}
                                    label="New Password"
                                    name="newPassword"
                                    // hasFeedback
                                    // required={false}
                                    rules={[
                                        { min: 5, message: 'Password name must be at least 5 characters!' },
                                    ]}
                                >
                                    <Input.Password placeholder="Enter new password" />
                                </Form.Item>
                                <Form.Item
                                    style={{flex: 1}}
                                    label="Confirm Password"
                                    name="confirmNewPassword"
                                    // hasFeedback
                                    // required={false}
                                    rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm password" />
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
                </>
            )}
        </div>
    )
}