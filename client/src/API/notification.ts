import axios from "axios";

// Create notification
export const createNotification = async(msg:string,user:string)=>{
    try {
        const res:any = await axios.post(`${import.meta.env.VITE_API_URL}/notification/create`,{msg,user});
        return res;
    } catch(err){
        return err;
    }
}
// Fetch notification
export const fetchNotifications = async()=>{
    try {
        const res:any = await axios.get(`${import.meta.env.VITE_API_URL}/notification/fetch`);
        return res?.data;
    } catch(err){
        return err;
    }
}
// Seen notifications
export const seenNotifs = async()=>{
    try {
        const res:any = await axios.put(`${import.meta.env.VITE_API_URL}/notification/seen`);
        return res;
    } catch(err){
        return err;
    }
}
