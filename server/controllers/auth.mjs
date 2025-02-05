import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/user.mjs"
import mongoose from 'mongoose';

// Signup
export const signup = async(req,res)=>{
    const {username,publicName,email,password} = req.body;
    try{

        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({ message: 'user already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(password, salt);

        const user = new User({
            publicName,
            username,
            email,
            password: hashPwd
        });
        await user.save();

        const token = jwt.sign(
            { id: user._id}, 
            process.env.SECRET_KEY,
            { expiresIn: '8h' }
        );

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            maxAge: new Date(Date.now() + 8 * 60 * 60 * 1000),
            path: '/',
        });
        return res.status(200).json({message: 'user created successfully' });
    } catch(err){
        console.error("Signup error:",err);
        return res.status(500).json({ message: 'server error' });
    }
}
// Setup profile
export const setupProfile = async(req,res) => {
    const {state,city,photo,pfpId,whatsapp,phone} = req.body.data;
    const id = req.token.id;
    console.log(req.body.data);
    console.log(id);
    try{
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(400).json({ message: 'user not found' });
        }
        await User.findByIdAndUpdate({_id:id},{
            state,
            city,
            photo,
            pfpId,
            isActive: true,
            contact: {phone,whatsapp}
        })
        return res.status(200).json({message: "user profile has been setup"});
    } catch(err){
        console.error("setupProfile error:",err);
        return res.status(500).json({ message: 'setupProfile server error' });
    }
}
// Logout
export const logout = (req,res)=>{
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
    });
    return res.status(200).json({ message: 'Logged out successfully' });
}
// Signin
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id}, 
            process.env.SECRET_KEY,
            { expiresIn: '8h' }
        );

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            maxAge: new Date(Date.now() + 8 * 60 * 60 * 1000),
            path: '/',
        });
        return res.status(200).json({message: 'Login successful'});
    } catch (err) {
        console.error("Signin error:", err.message); // Log only the error message
        return res.status(500).json({ message: 'Server error' });
    }
}



export const forgotpwd = (req,res)=>{
    res.send("forgotpassword done")
}
export const settings = (req,res)=>{
    res.send("settings done")
}
