import mongoose, {Schema} from "mongoose";

export default mongoose.model("users", new Schema(
    {
        username: {
            type: String,
            required: true
        },
        publicName: {
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
        contact: {
            phone: {
                type: String,
                default: ""
            },
            whatsapp: {
                type: String,
                default: ""
            }
        },
        isActive: {
            type: Boolean,
            default: false
        },
        followers: {
            type: [String],
            default: []
        }
    },{timestamps: true})
)