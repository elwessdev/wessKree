import axios from "axios";

// Get Properites
export const getProperties = async()=>{
    console.log("ee");
    try {
        const res = await axios.get("/api/property");
        return res?.data.properties;
    } catch(err) {
        return err;
    }
}