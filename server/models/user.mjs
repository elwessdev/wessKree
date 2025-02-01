import mongoose from "mongoose";
import { Schema } from "mongoose";

export default mongoose.model("user", new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            default: ""
        },
        pfpId: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: false
        },
    },{timestamps: true})
)