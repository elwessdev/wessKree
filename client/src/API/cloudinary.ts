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
// Delete Image
export const deleteCloud = async(id:string|undefined) => {
    try {
        const res = await axios.delete(`/api/user/deleteCloudImg/${id}`);
        return res?.data;
    } catch(err){
        return err;
    }
}