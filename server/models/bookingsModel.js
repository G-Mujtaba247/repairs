import mongoose from "mongoose";

const bookingStatus = {
    pending: "pending",
    confirmed: "confirmed",
    dispatched: "dispatched",
    processing: "processing",
    completed: "completed",
    cancelled: "cancelled"
};

const bookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    category: {
        type: String, // Keep for backward compatibility or general category
        required: false,
    },
    serviceType: {
        type: String, // "electronics" or "vehicles"
        enum: ["electronics", "vehicles"],
        required: false,
    },
    itemName: {
        type: String, // e.g. "Refrigerator", "AC", "Car", "Bike"
        required: false,
    },
    repairerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repairer",
        required: false,
    },
    locationName: {
        type: String, // Customer address/location
        required: false,
    },
    latitude: {
        type: Number,
        required: false,
    },
    longitude: {
        type: Number,
        required: false,
    },
    repairDate: {
        type: String,
        required: false,
    },
    repairTime: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: Object.values(bookingStatus),
        default: "pending"
    }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;