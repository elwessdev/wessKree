import axios from "axios";

// Login
export const signin = async (values: { username: string, password: string, keepLogin:boolean }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,{...values});
        return res;
    } catch (err){
        return err;
    }
};
// Signup
export const signup = async(username:string,publicName:string,email:string,password:string) => {
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,{
            username,publicName,email,password
        },{withCredentials: true});
        return res;
    } catch(err){
        return err;
    }
}
// Setup profile
export const setupProfile = async(data:any) => {
    try{
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/auth/setupProfile`,{data});
        return res;
    } catch(err){
        return err;
    }
}
// Check Password
export const checkPwd = async(pwd:string)=>{
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/checkPwd`,{password:pwd});
        return res;
    } catch(err){
        return err;
    }
}
// Check Username
export const checkUsername = async(username:string)=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/checkUsername`,{username});
        return res;
    } catch(err){
        return err;
    }
}
// Check Mail
export const checkEmail = async(email:string)=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/checkEmail`,{email});
        return res;
    } catch(err){
        return err;
    }
}