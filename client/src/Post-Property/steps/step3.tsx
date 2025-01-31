import { useEffect, useState } from 'react';
import { LoadingOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, message, Upload, Button, Flex } from 'antd';
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
    done: () => void,
    prev: () => void
}

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export default function Step3({data,setData,done,prev}:props){
    const [form] = Form.useForm();

    const [checkedFeatures, setCheckedFeatures] = useState<Record<string, boolean>>({
        wifi: false,
        backyard: false,
        workspace: false,
        parking: false,
        garage: false,
        airConditioner: false,
        swimmingPool: false,
        refrigerator: false,
        heating: false,
        stove: false,
        balcony: false,
    });

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
        // if(images.main && images.top && images.small1 && images.small2){
        //     message.error("Please upload images")
        //     return ;
        // }
        console.log(images);
        const features = Object.entries(checkedFeatures)
        .filter(([feature, isChecked]) => isChecked)
        .map(([feature]) => feature);
        console.log(features);
        setData({
            features: ["test"],
            images: images,
            previews: previews
        })
        // console.log(checkedFeatures.filter(prev=>prev===true));
    }

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
                                        showUploadList={false}
                                        // action={undefined}
                                        // beforeUpload={() => false}
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
                                <div className="f" onClick={() => handleCheckboxChange('wifi')}>
                                    <div className="icon"><FaWifi /></div>
                                    <p>Internet/WiFi</p>
                                    <div className="ok">
                                    {checkedFeatures.wifi && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('backyard')}>
                                    <div className="icon"><MdOutlineYard /></div>
                                    <p>Backyard</p>
                                    <div className="ok">
                                    {checkedFeatures.backyard && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('workspace')}>
                                    <div className="icon"><BsPersonWorkspace /></div>
                                    <p>Workspace</p>
                                    <div className="ok">
                                    {checkedFeatures.workspace && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('parking')}>
                                    <div className="icon"><AiFillSafetyCertificate /></div>
                                    <p>Parking</p>
                                    <div className="ok">
                                    {checkedFeatures.parking && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('garage')}>
                                    <div className="icon"><GiHomeGarage /></div>
                                    <p>Garage</p>
                                    <div className="ok">
                                    {checkedFeatures.garage && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('airConditioner')}>
                                    <div className="icon"><TbAirConditioning /></div>
                                    <p>Air Conditioner</p>
                                    <div className="ok">
                                    {checkedFeatures.airConditioner && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('swimmingPool')}>
                                    <div className="icon"><FaSwimmingPool /></div>
                                    <p>Swimming Pool</p>
                                    <div className="ok">
                                    {checkedFeatures.swimmingPool && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('refrigerator')}>
                                    <div className="icon"><MdOutlineKitchen /></div>
                                    <p>Refrigerator</p>
                                    <div className="ok">
                                    {checkedFeatures.refrigerator && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('heating')}>
                                    <div className="icon"><MdFireplace /></div>
                                    <p>Heating</p>
                                    <div className="ok">
                                    {checkedFeatures.heating && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('stove')}>
                                    <div className="icon"><GiGasStove /></div>
                                    <p>Stove</p>
                                    <div className="ok">
                                    {checkedFeatures.stove && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>

                                <div className="f" onClick={() => handleCheckboxChange('balcony')}>
                                    <div className="icon"><MdBalcony /></div>
                                    <p>Balcony</p>
                                    <div className="ok">
                                    {checkedFeatures.balcony && <IoIosCheckmarkCircle />}
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                    </Flex>

                    <div className='btns'>
                        <Button type="primary" onClick={prev}>
                            Previous
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Done
                        </Button>
                    </div>
            </Form>
        </div>
    )
}