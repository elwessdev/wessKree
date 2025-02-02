import mongoose from 'mongoose';
import Property from '../models/property.mjs';

// Post Property
export const postProperty = async(req,res) => {
    const data = req.body;
    const id = req.token.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({ message: 'id is not valid' });
        }
        const property = new Property({
            uid: req.token.id,
            ...data
        });
        await property.save();
        res.status(200).send({message: "property has been posted"});
    } catch(err){
        console.error("postProperty error:",err);
        res.status(500).send({ message: err });
    }
}
// Get Properties
export const getProperties = async(req,res) => {
    try {
        const properties = await Property.find({},{uid:0}).lean();
        res.status(200).send({properties});
    } catch(err){
        console.error("postProperty error:",err);
        res.status(500).send({ message: err });
    }
}
// Property details
export const propertyDetails = async(req,res) => {
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({ message: 'id is not valid' });
        }
        const details = await Property.find({_id:id},{uid:0}).lean();
        res.status(200).send({details});
    } catch(err){
        console.error("property details error:",err);
        res.status(500).send({ message: err });
    }
}