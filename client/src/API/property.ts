import axios from "axios";

// Post property
export const postProperty = async(data:any)=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/property/post`,{data});
        return res;
    } catch(err) {
        return err;
    }
}
// Get Properites
export const getProperties = async()=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/property`);
        return res?.data.properties;
    } catch(err) {
        return err;
    }
}
// Property details
export const propertyDetails = async(id:number)=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/property/details/${id}`);
        return res?.data;
    } catch(err) {
        return err;
    }
}
// Add favorite
export const addFavorite = async(id:string|undefined)=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/favorite`,{id});
        return res?.data;
    } catch(err){
        return err;
    }
}
// Delete Property
export const deleteProperty = async(id:string|undefined)=>{
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/property/delete/${id}`);
        return res.data;
    } catch(err){
        return err;
    }
}