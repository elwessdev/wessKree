import axios from "axios";

// Send Apply
export const sendApply = async(data:any) => {
    try {
        const res:any = await axios.post(`${import.meta.env.VITE_API_URL}/request/apply`,{data});
        return res;
    } catch(err){
        return err;
    }
}
// Get Applications
export const getApplications = async() => {
    try {
        const res:any = await axios.get(`${import.meta.env.VITE_API_URL}/request/fetchApplications`,);
        return res;
    } catch(err){
        return err;
    }
}
// Chat details
export const chatDetails = async(id:string) => {
    try {
        const res:any = await axios.get(`${import.meta.env.VITE_API_URL}/request/chatDetails/${id}`);
        return res;
    } catch(err){
        return err;
    }
} 
// Accept apply
export const changeApplyStatus = async(status:string,id:string)=>{
    try {
        const res:any = await axios.put(`${import.meta.env.VITE_API_URL}/request/changeApplyStatus`,{status,id});
        return res;
    } catch(err){
        return err;
    }
}
// Send Message
export const sendMsg = async(type:string,msg:string,id:string)=>{
    try {
        const res:any = await axios.post(`${import.meta.env.VITE_API_URL}/request/sendMsg`,{type,msg,id});
        return res;
    } catch(err){
        return err;
    }
}