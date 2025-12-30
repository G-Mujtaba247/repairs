import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    mission: {
        type: String,
        required: true,
    },
    vision: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true
    },
    features: {
        type: Array,
        required: false,
    }
}, { timestamps: true });

const AboutUs = mongoose.model("AboutUs", aboutSchema);
export default AboutUs;