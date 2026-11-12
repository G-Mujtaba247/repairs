import mongoose from "mongoose";

const bookingStatus = {
    pending: "pending",
    confirmed: "confirmed",
    processing: "processing",
    dispatched: "dispatched",
    accepted: "accepted",
    rejected: "rejected",
    in_progress: "in_progress",
    completed: "completed",
    cancelled: "cancelled"
};

const bookingSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'TechnicianProfile' },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    category: { type: String },
    issue: { type: String },
    message: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'] },
    locationName: { type: String },
    repairDate: { type: String },
    repairTime: { type: String },
    deviceCategory: { type: String },
    serviceRequested: { type: String },
    issueDescription: { type: String },
    scheduledDate: { type: String },
    scheduledTime: { type: String },
    status: { type: String, enum: Object.values(bookingStatus), default: bookingStatus.pending },
    price: { type: Number, required: false },
    rating: { type: Number, min: 0, max: 5 }, // customer rating of technician after completion
    reviewText: { type: String },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;