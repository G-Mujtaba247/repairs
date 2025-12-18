import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    map: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const ContactUs = mongoose.model("ContactUs", contactSchema);
export default ContactUs;