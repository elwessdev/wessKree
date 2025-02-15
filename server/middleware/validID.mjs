import mongoose from "mongoose";
import User from "../models/user.mjs";

const validID = async(req,res,next) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.token.id)){
            return res.status(403).json({ message: 'invalid id' });
        } 
        const user = await User.findOne({_id:req.token.id});
        if(!user){
            return res.status(404).json({ message: 'user not found' });
        }
        next();
    } catch(err){
        return res.status(500).json({message:"checking error"});
    }
}
export default validID;