import mongoose from "mongoose";

const webpageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const Webpage = mongoose.model("webpage", webpageSchema);
export default Webpage;