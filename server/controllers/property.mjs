import mongoose from 'mongoose';
import Property from '../models/property.mjs';
import User from '../models/user.mjs';
import jwt from "jsonwebtoken";
import { io, users } from '../server.mjs';
import Notification from '../models/notification.mjs';

// Post Property
export const postProperty = async(req,res) => {
    const {data} = req.body;
    const id = req.token.id;
    // console.log(data);
    try {
        const property = new Property({
            uid: req.token.id,
            ...data
        });
        const savedProp = await property.save();
        if(savedProp.error){
            return res.status(400).json({message: saveProp.error});
        }
        const followers = await User.findOne({_id:id }).lean();
        if(followers?.followers?.length > 0){
            followers.followers.forEach(async(follower) => {
                const userSocketIsActive = users.get(follower);
                // const myInfo = await User.findOne({_id:id},{publicName:1,photo:1}).lean();
                // if(followerInfo){
                    await new Notification({
                        user: follower,
                        message: `${followers.publicName} post a new property`,
                        link: `/property/${savedProp._id}`,
                        img: followers.photo
                    }).save();
                    if(userSocketIsActive){
                        io.to(userSocketIsActive.socketId).emit('notify', `${followers?.publicName} has posted a new property`);
                        console.log(`${follower} is active send notif and save`);
                    }
                    console.log(`${follower} is not active send notif and save`);
                // }
            });
        }
        return res.status(200).json({message: "property has been posted", id: savedProp._id});
    } catch(err){
        console.error("postProperty error:",err);
        return res.status(500).json({message: err});
    }
}
// Get Properties
export const getProperties = async(req,res) => {
    try {
        const token = req.cookies.tkn;
        if (token) {
            const {id} = jwt.verify(token, process.env.SECRET_KEY);
            const properties = await Property.find({uid:{$ne:id}},{uid:0}).sort({createdAt:-1}).lean();
            return res.status(200).json({properties});
        }
        const properties = await Property.find({},{uid:0}).sort({createdAt:-1}).lean();
        return res.status(200).json({properties});
    } catch(err){
        console.error("postProperty error:",err);
        return res.status(500).json({ message: err });
    }
}
// Property details
export const propertyDetails = async(req,res) => {
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'id is not valid' });
        }
        const propertyDetails = await Property.findById(id).lean();
        if (!propertyDetails) {
            return res.status(404).json({ message: "Property does not exist" });
        }
        const userId = propertyDetails.uid;
        if (userId) {
            const userDetails = await User.findOne({ _id: userId },{
                _id: 0,
                username: 1,
                publicName: 1,
                photo: 1,
                state: 1,
                city: 1
            }).lean();
            if (!userDetails) {
                return res.status(404).json({ message: "Property user does not exist" });
            }
            delete propertyDetails.uid;
            return res.status(200).json({ ...propertyDetails, user: userDetails });
        }
        return res.status(400).send({message: "something worng"});
    } catch(err){
        console.error("property details error:",err);
        return res.status(500).send({ message: err });
    }
}
// Delete Property
export const deleteProperty = async(req,res)=> {
    try {
        const {id:propertyID} = req.params;
        const {id:userID} = req.token;
        const checkOwner = await Property.findOne({_id:propertyID,uid:userID}).lean();
        if(!checkOwner){
            return res.status(401).json({message: "Property not found", success: false});
        }
        const deleteProp = await Property.findByIdAndDelete(propertyID);
        if(deleteProp.error){
            return res.status(400).json({message: "Something wrong, Try again", success: false});
        }
        return res.status(200).json({message: "property has been deleted", success: true});
    } catch(err){
        console.error("deleteProperty error:",err);
        return res.status(500).send({ message: err});
    }
}