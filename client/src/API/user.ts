import axios from "axios";

// User Info
export const getUserInfos = async(name:string)=>{
    try {
        const res = await axios.get(`/api/user/info/${name}`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// User Properties
export const userProperties = async(name:string|undefined)=>{
    try {
        const res = await axios.get(`/api/user/userProperties/${name}`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// Favorite List
export const favorite = async()=>{
    try {
        const res = await axios.get(`/api/user/favorite`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// Delete Favorite
export const deleteFav = async(id:string)=>{
    try {
        const res = await axios.delete(`/api/user/deleteFavorite/${id}`);
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
        const res = await axios.put("/api/user/update",{data});
        return res;
    } catch(err){
        return err;
    }
}