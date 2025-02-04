import mongoose from "mongoose";

const validID = (req,res,next) => {
    if(!mongoose.Types.ObjectId.isValid(req.token.id)){
        return res.status(403).json({ message: 'invalid id' });
    } else {
        next();
    }
}
export default validID;