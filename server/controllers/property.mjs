import mongoose from 'mongoose';
import Property from '../models/property.mjs';
import User from '../models/user.mjs';

// Post Property
export const postProperty = async(req,res) => {
    const data = req.body;
    const id = req.token.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'id is not valid'});
        }
        const property = new Property({
            uid: req.token.id,
            ...data
        });
        await property.save();
        return res.status(200).json({message: "property has been posted"});
    } catch(err){
        console.error("postProperty error:",err);
        return res.status(500).json({message: err});
    }
}
// Get Properties
export const getProperties = async(req,res) => {
    try {
        const properties = await Property.find({},{uid:0}).lean();
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