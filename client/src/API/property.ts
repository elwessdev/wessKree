import axios from "axios";

// Get Properites
export const getProperties = async()=>{
    try {
        const res = await axios.get("/api/property");
        return res?.data.properties;
    } catch(err) {
        return err;
    }
}
// Property details
export const propertyDetails = async(id:number)=>{
    try {
        const res = await axios.get(`/api/property/details/${id}`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
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