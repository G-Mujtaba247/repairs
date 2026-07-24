import mongoose from "mongoose";

const bookingStatus = {
    pending: "pending",
    accepted: "accepted",
    rejected: "rejected",
    in_progress: "in_progress",
    completed: "completed",
    cancelled: "cancelled"
};

const bookingSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'TechnicianProfile', required: true },
    deviceCategory: { type: String, required: true },
    serviceRequested: { type: String, required: true },
    issueDescription: { type: String },
    scheduledDate: { type: String, required: true },
    scheduledTime: { type: String, required: true },
    status: { type: String, enum: Object.values(bookingStatus), default: bookingStatus.pending },
    price: { type: Number, required: false },
    rating: { type: Number, min: 0, max: 5 }, // customer rating of technician after completion
    reviewText: { type: String },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;