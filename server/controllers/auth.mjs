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
            maxAge: 60 * 60 * 1000,
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
        const expire = new Date(Date.now()+30*60*1000);
        const send = await User.findByIdAndUpdate(user._id,{
            resetPwd:{
                OTP: code,
                expireDate: expire
            }
        })
        if(send){
            await transporter.sendMail({
                from: "WessKree",
                to: email,
                subject: "wessKree - Reset Password",
                text: `Your reset password code is: ${code}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>wessKree</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FFF; width: 100%; padding: 10px;">
                            <tr>
                                <td align="center">
                                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background: #f8f7fe; padding: 20px; text-align: center; border: 1px solid #7065ef30;">
                                        <!-- Header -->
                                        <tr>
                                            <td style="font-size: 28px; font-weight: bold; color: #7065ef;">
                                                <img style="width: 260px;" src="https://i.ibb.co/xqRyd0qt/logo-without-BG.png" alt="wessKree logo" />
                                            </td>
                                        </tr>
                                        <!-- Message Content -->
                                        <tr>
                                            <td style="font-size: 16px; line-height: 1.5; text-align: left; padding: 0 20px; color: #0d133a;">
                                                <p style="margin:0">Hello, ${user.publicName}</p>
                                                <p style="margin:0px">Please use the following code to reset your password:</p>
                                            </td>
                                        </tr>
                                        <!-- Code Box -->
                                        <tr>
                                            <td align="center" style="padding: 20px;">
                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="90%">
                                                    <tr>
                                                        <td style="font-size: 26px; font-weight: bold; letter-spacing: 10px; padding: 13px; background: #FFF; color: #7065ef; border: 1px solid #7065ef;text-align:center">
                                                            <strong>${code}</strong>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Expiry Note -->
                                        <tr>
                                            <td style="font-size: 16px; line-height: 1.5; text-align: center; color: #0d133a; padding: 0 20px;">
                                                <p style="margin:0px">The code is valid for 30 minutes, so please use it promptly.</p>
                                            </td>
                                        </tr>
                                        <!-- Footer -->
                                        <tr>
                                            <td style="font-size: 14px; text-align: center; color: #0d133a; padding-top: 20px;">
                                                <p style="margin:0px">Best regards, wessKree</p>
                                                <p style="margin:0px"><a href="mailto:support@wessKree.com" style="color: #7065ef; text-decoration: none;">support@wessKree.com</a></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                `
            });
        }
        return res.status(200).json({message: 'send code'});
    } catch(err){
        console.error("send code error:",err);
        return res.status(500).json({ message: 'server error' });
    }
}
// Verify Code
export const verifyOTP = async(req,res)=>{
    try{
        const {email,otp} = req.body;
        const user = await User.findOne({email});
        if(!user||user.resetPwd.OTP !== otp){
            console.log(user.resetPwd.OTP,otp);
            return res.status(400).json({message: 'Code not valid'});
        }
        if(user.resetPwd.expireDate < Date.now()){
            return res.status(400).json({message: 'Code expired'});
        }
        return res.status(200).json({message: 'code verified'});
    } catch(err){
        console.error("verifyOTP error:",err);
        return res.status(500).json({ message: 'server error' });
    }
}
// Change Password
export const changePwd = async(req,res)=>{
    try{
        const {email,otp,password} = req.body;
        const user = await User.findOne({email});
        if(!user||user.resetPwd.OTP !== otp){
            return res.status(400).json({message: 'OTP Code not valid'});
        }
        if(user.resetPwd.expireDate < Date.now()){
            return res.status(400).json({message: 'OTP Code expired'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(password,salt);
        user.password = hashPwd;
        user.resetPwd = {
            OTP: null,
            expireDate: null
        };
        await user.save();
        return res.status(200).json({message: 'change password'});
    } catch(err){
        console.error("changePwd error:",err);
        return res.status(500).json({ message: 'server error' });
    }
}