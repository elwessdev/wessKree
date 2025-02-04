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