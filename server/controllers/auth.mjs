import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/user.mjs"
import mongoose from 'mongoose';


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
            { expiresIn: '1h' }
        );

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            maxAge: 3600000,
            path: '/',
        });

        res.status(200).send({ message: 'user created successfully' });

    } catch(err){
        console.error("Signup error:",err);
        res.status(500).send({ message: 'server error' });
    }
}

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
            username: user.username,
            email: user.email,
            photo: user.photo,
            state: user.state,
            city: user.city,
            isActive: user.isActive
        });
    } catch(err){
        console.error("getUser error:",err);
        res.status(500).send({ message: 'server error' });
    }
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
