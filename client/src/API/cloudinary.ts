import axios from "axios"

// Upload
export const uploadCloud = async(file:File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_PRESET);
    try{
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD}/image/upload/`, formData);
        return res;
    } catch(err){
        return err;
    }
}