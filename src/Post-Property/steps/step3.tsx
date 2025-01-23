import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
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

// const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};


export default function Step3(){
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

    const handleCheckboxChange = (feature: string) => {
        setCheckedFeatures((prev) => ({
            ...prev,
            [feature]: !prev[feature],
        }));
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as FileType, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div className="step step3">
            <Form
                form={form}
                layout="vertical"
                requiredMark='optional'
                >
                    <Form.Item style={{ flex: 1 }} label="Images" required tooltip={{ title: 'This is a required field', icon: <VscQuestion /> }}>
                        <div className="gallery">
                            <div className="main-image">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div className="top-image">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div className="bottom-images">
                                <div className="small-image">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
                                <div className="small-image">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item style={{ flex: 1 }} label="Features" required tooltip={{ title: 'Click to select the feature', icon: <VscQuestion /> }}>
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
            </Form>
        </div>
    )
}