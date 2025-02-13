import bcrypt from "bcryptjs";
import Property from '../models/property.mjs';
import User from '../models/user.mjs';
import Favorite from '../models/favorite.mjs';


// After Login Details
export const getUser = async(req,res)=>{
    const id = req.token.id;
    try{
        const user = await User.findOne({_id:id});
        if(!user){
            return res.status(400).json({ message: 'user not found' });
        }
        return res.status(200).json(user);
    } catch(err){
        console.error("getUser error:",err);
        return res.status(500).json({ message: 'getUser server error' });
    }
}

// User Infos
export const userInfos = async(req,res)=>{
    const username = req.params.username;
    try {
        const userDetails = await User.findOne({username},{
            _id:0,
            username: 1,
            publicName: 1,
            photo: 1,
            state: 1,
            city: 1
        }).lean();
        if (!userDetails) {
            return res.status(404).json({ message: "user not found" });
        }
        delete userDetails._id;
        return res.status(200).json(userDetails);
    } catch(err){
        console.error("user property details error:",err);
        return res.status(500).send({ message: err });
    }
}
// User Properties
export const userProperties = async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username},{_id:1});
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const properties = await Property.find({uid:user._id},{uid:0}).lean();
        return res.status(200).json(properties);
    } catch(err){
        console.error("user property details error:",err);
        return res.status(500).send({ message: err });
    }
}

// Check Password
export const checkPwd = async(req,res)=>{
    const id = req.token.id;
    const password = req.body.password;
    try {
        const pwd = await User.findOne({_id:id},{password:1}).lean();
        const isMatch = await bcrypt.compare(password, pwd.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'password incorrect' });
        }
        return res.status(200).json({message: "correct password"})
    } catch(err){
        console.error("user PWD error:",err);
        return res.status(500).send({ message: err });
    }
}
// Check Username
export const checkUsername = async(req,res)=>{
    const username = req.body.username;
    try{
        const exist = await User.findOne({username});
        if(exist){
            return res.status(200).json({message:"username exist"});
        }
        return res.status(400).json({message:"username is not exist"});
    } catch(err){
        console.error("check username error:",err);
        return res.status(500).send({ message: err });
    }
}
// Check Email
export const checkEmail = async(req,res)=>{
    const email = req.body.email;
    try{
        const exist = await User.findOne({email});
        if(exist){
            return res.status(200).json({message:"email exist"});
        }
        return res.status(400).json({message:"email is not exist"});
    } catch(err){
        console.error("check email error:",err);
        return res.status(500).send({ message: err });
    }
}

// Update profile
export const updateProfile = async(req,res)=>{
    const {data} = req.body;
    const {id} = req.token;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, data);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json("Profile has been update");
    } catch(err){
        console.error("Update profile error:", err);
        return res.status(500).json({ message: "update profile error" });
    }
}

// Add favorite
export const addFavorite = async(req,res)=>{
    const {id:propertyId} = req.body;
    const {id:userId} = req.token;
    try{
        const propUID = await Property.findById(propertyId,{uid:1}).lean();
        if(propUID.uid==userId){
            return res.status(200).json({myProperty:true});
        }
        const isExist = await Favorite.findOne({userId:userId,propertyId:propertyId});
        if(isExist){
            return res.status(200).json({exist:true});
        }
        const addFavorite = new Favorite({
            userId,
            propertyId
        });
        await addFavorite.save();
        return res.status(200).json({success:true});
    } catch(error){
        console.error("add favorite error:", error);
        return res.status(500).json({ message: "add favorite", error });
    }
}
// Favorite List
export const favoriteList = async(req,res)=>{
    const {id} = req.token;
    try {
        const favorite = await Favorite.find({userId:id},{propertyId:1}).lean();
        if(!favorite){
            return res.status(200).json(favorite);
        }
        const propertyIds = favorite.map(fav => fav.propertyId);
        const properties = await Property.find({ _id: { $in: propertyIds } },{uid:0}).lean();
        return res.status(200).json(properties);
    } catch(err){
        console.error("favorite error:",err);
        return res.status(500).send({ message: err });
    }
}
// Delete favorite
export const deleteFavorite = async(req,res)=>{
    const {id:propertyId} = req.params;
    const {id:userId} = req.token;
    try {
        const fav = await Favorite.findOneAndDelete({ userId,propertyId });
        if (fav) {
            return res.status(200).json({ success: true });
        }
        return res.status(404).json({ success: false, message: "Favorite not found" });
    } catch(err){
        console.error("delete favorite error:",err);
        return res.status(500).send({ message: err });
    }
}