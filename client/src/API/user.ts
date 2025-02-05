import axios from "axios";

// User Info
export const getUserInfos = async(name:number)=>{
    try {
        const res = await axios.get(`/api/user/info/${name}`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// Get My Infos
export const getMyInfo = async()=>{
    try {
        const res = await axios.get(`/api/user/myInfo`);
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