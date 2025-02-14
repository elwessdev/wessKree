import mongoose, {Schema} from "mongoose";


const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["owner", "renter"],
        required: true,
    },
},{timestamps:true});

export default mongoose.model("applies", new Schema({
    renter: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', 
        required: true 
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', 
        required: true 
    },
    property: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'properties', 
        required: true 
    },
    status: {
        type: String,
        enum: ["accepted","rejected","pending","closed"],
        default: "pending"
    },
    type: {
        type: String,
        enum: ["apply","tour","question"],
        required: true
    },
    messages: [MessageSchema]
}, { timestamps: true }))