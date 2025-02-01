import { useEffect, useState } from 'react';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, message, Upload, Button, Flex, Spin } from 'antd';
import type { UploadProps } from 'antd';
// import type { GetProp, UploadProps } from 'antd';
import { VscQuestion } from "react-icons/vsc";

import { FaWifi } from "react-icons/fa";
import { MdOutlineYard } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdFireplace } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiHomeGarage } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { FaSwimmingPool } from "react-icons/fa";
import { MdOutlineKitchen } from "react-icons/md";
import { GiGasStove } from "react-icons/gi";
import { MdBalcony } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

// Type
type props = {
    done: () => any,
    prev: () => void,
    setData: any,
    data: any,
    loading: boolean
}

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const featuresList = [
    { key: "wifi", label: "Internet/WiFi", icon: <FaWifi /> },
    { key: "backyard", label: "Backyard", icon: <MdOutlineYard /> },
    { key: "workspace", label: "Workspace", icon: <BsPersonWorkspace /> },
    { key: "parking", label: "Parking", icon: <AiFillSafetyCertificate /> },
    { key: "garage", label: "Garage", icon: <GiHomeGarage /> },
    { key: "airConditioner", label: "Air Conditioner", icon: <TbAirConditioning /> },
    { key: "swimmingPool", label: "Swimming Pool", icon: <FaSwimmingPool /> },
    { key: "refrigerator", label: "Refrigerator", icon: <MdOutlineKitchen /> },
    { key: "heating", label: "Heating", icon: <MdFireplace /> },
    { key: "stove", label: "Stove", icon: <GiGasStove /> },
    { key: "balcony", label: "Balcony", icon: <MdBalcony /> },
];

const FeatureItem = ({ feature, checked, onClick }: { feature: any; checked: boolean; onClick: () => void }) => (
    <div className="f" onClick={onClick}>
        <div className="icon">{feature.icon}</div>
        <p>{feature.label}</p>
        <div className="ok">{checked && <IoIosCheckmarkCircle />}</div>
    </div>
);

export default function Step3({loading,data,setData,done,prev}:props){
    const [form] = Form.useForm();

    const [checkedFeatures, setCheckedFeatures] = useState<Record<string, boolean>>(
        Object.fromEntries(featuresList.map(({ key }) => [key, false]))
    );

    const [images, setImages] = useState<{ [key: string]: File | null }>({
        main: data?.images.main,
        top: data?.images.top,
        small1: data?.images.small1,
        small2: data?.images.small2,
    });

    const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
        main: data?.previews.main,
        top: data?.previews.top,
        small1: data?.previews.small1,
        small2: data?.previews.small2,
    });

    const validateFile = (file: File) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            message.error("Only JPG and PNG images are allowed!");
            return false;
        }
        if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
            message.error(`Image must be less than ${MAX_FILE_SIZE_MB}MB!`);
            return false;
        }
        return true;
    };

    const handleChange = (key: string): UploadProps["onChange"] => ({ file }) => {
        if (file.status === "done" || file.originFileObj) {
            const selectedFile = file.originFileObj as File;
            // console.log(selectedFile);
            if (!validateFile(selectedFile)) return;
            setImages((prev) => ({ ...prev, [key]: selectedFile }));
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
            };
        }
    };

    const handleCheckboxChange = (feature: string) => {
        setCheckedFeatures((prev) => ({
            ...prev,
            [feature]: !prev[feature],
        }));
    };
    
    const handleSubmit = () => {
        // console.log(images);
        const features = Object.entries(checkedFeatures)
        .filter(([_, isChecked]) => isChecked)
        .map(([feature]) => feature);
        // console.log(features);
        setData({
            features: features,
            images: images,
            previews: previews
        })
        done();
    }

    useEffect(() => {
        const initialState = Object.fromEntries(featuresList.map(({ key }) => [key, data?.features.includes(key)]));
        setCheckedFeatures(initialState);
    }, [data]);

    return (
        <div className="step step3">
            <Form
                form={form}
                layout="vertical"
                // requiredMark='optional'
                onFinish={handleSubmit}
                >
                    <Flex gap={18} vertical>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Images"
                            tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}
                        >
                            <div className="gallery">
                                <div className="main-image">
                                    <Upload
                                        name="main"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        progress={{ strokeWidth: 2, showInfo: false }}
                                        showUploadList={false}
                                        // action={undefined}
                                        // beforeUpload={() => {console.log("test")}}
                                        onChange={handleChange("main")}
                                    >
                                        {previews["main"]
                                            ? <img src={previews["main"]!} alt={"main"} />
                                            : <Button icon={<UploadOutlined />}>Select</Button>
                                        }
                                    </Upload>
                                </div>
                                <div className="top-image">
                                    <Upload
                                            name="top"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            // action={undefined}
                                            // beforeUpload={() => false}
                                            onChange={handleChange("top")}
                                        >
                                            {previews["top"]
                                                ? <img src={previews["top"]!} alt={"top"} />
                                                : <Button icon={<UploadOutlined />}>Select</Button>
                                            }
                                    </Upload>
                                </div>
                                <div className="bottom-images">
                                    <div className="small-image">
                                        <Upload
                                                name="small1"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                // action={undefined}
                                                // beforeUpload={() => false}
                                                onChange={handleChange("small1")}
                                            >
                                                {previews["small1"]
                                                    ? <img src={previews["small1"]!} alt={"small1"} />
                                                    : <Button icon={<UploadOutlined />}>Select</Button>
                                                }
                                        </Upload>
                                    </div>
                                    <div className="small-image">
                                        <Upload
                                                name="small2"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                // action={undefined}
                                                // beforeUpload={() => false}
                                                onChange={handleChange("small2")}
                                            >
                                                {previews["small2"]
                                                    ? <img src={previews["small2"]!} alt={"small2"} />
                                                    : <Button icon={<UploadOutlined />}>Select</Button>
                                                }
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }}
                            label="Features"
                            tooltip={{ title: 'Click to select the feature', icon: <VscQuestion /> }}>
                            <div className="features">
                                {featuresList.map((feature) => (
                                    <FeatureItem
                                        key={feature.key}
                                        feature={feature}
                                        checked={checkedFeatures[feature.key]}
                                        onClick={() => handleCheckboxChange(feature.key)}
                                    />
                                ))}
                            </div>
                        </Form.Item>
                    </Flex>
                    <div className='btns'>
                        <Button type="primary" onClick={prev}>
                            Previous
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {loading ?<Spin indicator={<LoadingOutlined spin />} /> :"Post"}
                        </Button>
                    </div>
            </Form>
        </div>
    )
}