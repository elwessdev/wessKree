import mongoose, { Schema } from "mongoose";

export default mongoose.model("favorite", new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        propertyId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "properties", 
            required: true
        },
    },
    {timestamps:true}
))