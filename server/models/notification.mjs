import mongoose, { Schema } from "mongoose";

export default mongoose.model("notification", new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        message: {
            type: String,
            required: true
        },
        seen: {
            type: String,
            default: false
        }
    },{timestamps:true}
))