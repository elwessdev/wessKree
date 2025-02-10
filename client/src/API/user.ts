import axios from "axios";

// User Info
export const getUserInfos = async(name:string)=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/info/${name}`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// User Properties
export const userProperties = async(name:string|undefined)=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/userProperties/${name}`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// Favorite List
export const favorite = async()=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/favorite`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// Delete Favorite
export const deleteFav = async(id:string)=>{
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/user/deleteFavorite/${id}`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// Update profile
type updateType = {
    publicName?: string,
    photo?: string,
    pfpId?: string,
    password?: string,
    email?: string,
    state?: string,
    city?: string
}
export const updateProfile = async(data:updateType)=>{
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/update`,{data});
        return res;
    } catch(err){
        return err;
    }
}