import axios from "axios";

// Send Apply
export const sendApply = async(data:any) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/request/apply`,{data});
        return res;
    } catch(err){
        return err;
    }
}
// Get Applications
export const getApplications = async() => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/request/fetchApplications`,);
        return res;
    } catch(err){
        return err;
    }
}