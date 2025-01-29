import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/user.mjs"
import mongoose from 'mongoose';

// Signup
export const signup = async(req,res)=>{
    const {username,email,password} = req.body;
    try{

        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).send({ message: 'user already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(password, salt);

        const user = new User({
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

        res.status(200).send({message: 'user created successfully' });

    } catch(err){
        console.error("Signup error:",err);
        res.status(500).send({ message: 'server error' });
    }
}
// Get user details
export const getUser = async(req,res)=>{
    const id = req.token.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({ message: 'user id is not valid' });
        }
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(400).send({ message: 'user not found' });
        }
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            state: user.state,
            city: user.city,
            isActive: user.isActive
        });
    } catch(err){
        console.error("getUser error:",err);
        res.status(500).send({ message: 'getUser server error' });
    }
}
// Setup profile
export const setupProfile = async(req,res) => {
    const {state,city,photo,pfpId,id} = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({ message: 'user id is not valid' });
        }
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(400).send({ message: 'user not found' });
        }
        await User.findByIdAndUpdate({_id:id},{
            state,
            city,
            photo,
            pfpId,
            isActive: true
        })
        res.status(200).send({message: "user profile has been setup"});
    } catch(err){
        console.error("setupProfile error:",err);
        res.status(500).send({ message: 'setupProfile server error' });
    }
}
// Logout
export const logout = async(req,res)=>{
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
    });
    res.status(200).json({ message: 'Logged out successfully' });
}



export const signin = async (req,res)=>{
    res.send("signin done")
}
export const forgotpwd = (req,res)=>{
    res.send("forgotpassword done")
}
export const settings = (req,res)=>{
    res.send("settings done")
}
