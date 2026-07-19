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
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'TechnicianProfile', required: true },
    deviceCategory: { type: String, required: true },
    serviceRequested: { type: String, required: true },
    issueDescription: { type: String },
    scheduledDate: { type: String, required: true },
    scheduledTime: { type: String, required: true },
    status: { type: String, enum: Object.values(bookingStatus), default: bookingStatus.pending },
    price: { type: Number, required: false },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;