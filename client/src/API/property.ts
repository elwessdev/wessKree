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
// Add favorite
export const addFavorite = async(id:string)=>{
    console.log(id);
}