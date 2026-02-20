import mongoose from "mongoose";

const bookingStatus = {
    pending: "pending",
    confirmed: "confirmed",
    processing: "processing",
    completed: "completed",
    cancelled: "cancelled"
}

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
        required: false,
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
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: Object.values(bookingStatus),
        defaultValue: bookingStatus.pending
    }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;