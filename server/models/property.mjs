import mongoose, {Schema} from "mongoose";

export default mongoose.model("properties", new Schema(
    {
        uid: {
            type: String,
            required: true
        },
        // Step 1
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        category: {
            type: [String],
            required: true
        },
        area: {
            width: {
                type: Number,
                required: true
            },
            length: {
                type: Number,
                required: true
            }
        },
        rooms: {
            type: Number,
            required: true
        },
        bedrooms: {
            type: Number,
            required: true
        },
        bathrooms: {
            type: Number,
            required: true
        },
        kitchen: {
            type: Number,
            required: true
        },
        furnishingStatus: {
            type: String,
            required: true
        },
        leaseDuration: {
            type: [String],
            required: true
        },
        price: {
            day: String,
            week: String,
            month: String
        },
        contact: {
            phone: String,
            whatsapp: String,
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "available"
        },
        // Step 2
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
        neighborhood: String,
        map: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        },
        // Step 3
        imgs: [
            {
                cloudId: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        features: [String]
    },
    {timestamps: true}
))