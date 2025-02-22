import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/user.mjs"
import nodemailer from 'nodemailer';
import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config();
// import mongoose from 'mongoose';

// Config nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});
// Gnerate secure code
function generateSecureCode(length) {
    return crypto.randomBytes(length)
        .toString("base64")
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, length);
}

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

        res.cookie('tkn', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            maxAge: 8 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'prod' ? "None" : undefined,
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
    const {data} = req.body;
    const id = req.token.id;
    try{
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(400).json({ message: 'user not found' });
        }
        await User.findByIdAndUpdate(id,{
            ...data,
            isActive: true
        },{})
        return res.status(200).json({message: "user profile has been setup"});
    } catch(err){
        console.error("setupProfile error:",err);
        return res.status(500).json({ message: 'setupProfile server error' });
    }
}
// Logout
export const logout = (req,res)=>{
    res.clearCookie('tkn', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
    });
    return res.status(200).json({ message: 'Logged out successfully' });
}
// Signin
export const signin = async (req, res) => {
    try {
        const { email, password, keepLogin } = req.body;
        // console.log(keepLogin);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {id: user._id}, 
            process.env.SECRET_KEY,
            {expiresIn: keepLogin ?'3d' :'1h'}
        );

        // console.log(token);

        res.cookie('tkn', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            maxAge: keepLogin ?3*24*60*60*1000 :60*60*1000,
            sameSite: process.env.NODE_ENV === 'prod' ? "None" : undefined,
            path: '/',
        });
        return res.status(200).json({message: 'Login successful'});
    } catch (err) {
        console.error("Signin error:", err.message); // Log only the error message
        return res.status(500).json({ message: 'Server error' });
    }
}
// Send Code
export const sendCode = async(req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(200).json({message: 'send code ++'});
        }
        const code = generateSecureCode(6);
        await transporter.sendMail({
            from: "WessKree",
            to: email,
            subject: "Verification Code",
            text: `Your verification code is: ${code}`,
            html: `<p>Your verification code is: <strong>${code}</strong></p>`
        });
        return res.status(200).json({message: 'send code'});
    } catch(err){
        console.error("send code error:",err);
        return res.status(500).json({ message: 'server error' });
    }
}