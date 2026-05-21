import mongoose from "mongoose";

const repairerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["electronics", "vehicles", "both"],
    },
    specialties: {
        type: [String],
        default: [],
    },
    locationName: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 1,
        max: 5,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "busy", "offline"],
        default: "available",
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=200",
    },
    pricing: {
        type: Number,
        required: true,
        default: 500, // base consultation fee in PKR / local currency
    },
    experience: {
        type: Number,
        required: true,
        default: 2, // years of experience
    }
}, { timestamps: true });

const Repairer = mongoose.model("Repairer", repairerSchema);
export default Repairer;
