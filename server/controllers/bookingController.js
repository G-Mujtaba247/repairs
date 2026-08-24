import Booking from "../models/bookingsModel.js";
import TechnicianProfile from '../models/technicianProfileModel.js';
import { sendEmail } from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
    const booking = req.body;
    console.log(booking);
    try {
        booking.status = "pending"; // setting default status
        const response = await Booking.create(booking);
        if (response) {

            const contentEmail = `Hi ${booking.firstName}, Thankyou for your appliance booking. We will contact you shortly \n Regards: REPAIRS EXPERTS`;

            sendEmail(booking.email, "Your booking created succesful!", contentEmail)

            return res.send({status: true, message: "Thank you for your booking, we will inform you."})
        } else {
            return res.send({status: false, message: "Please try again later!"})
        }
    } catch (error) {
        console.log("Error: ", error)
        return res.send({status: false, message: "Network error!"})        
    }
}

export const allBooking = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate("repairerId").sort({ createdAt: -1 });
        if (bookings.length > 0) {
            return res.send({status: true, bookings})
        } else {
            return res.send({status: false, message: "No bookings were found"})
        }
    } catch (error) {
        return res.send({status: false, message: "Network error!"})           
    }
}

export const updateBooking = async (req, res) => {
    const booking = req.body;
    try {
        const bookingData = await Booking.findById({_id: booking.bookingId});
        if (!bookingData) return res.send({status: false, message: "Booking was not found or maybe deleted"});

        const updateBooking = await Booking.findByIdAndUpdate({_id: booking.bookingId}, {status: booking.status});
        if (updateBooking) {

            const subject = `Update: your booking has been ${booking.status}`;
            const content = `Your booking has been scheduled as ${booking.status}. For further information kindly contact at (+51) 345 678`
            sendEmail(updateBooking.email, subject, content)

            return res.send({status: true, message: "Booking status has been updated!"});
        } else {
            return res.send({status: false, message: "Failed to update booking status"});
        }

    } catch (error) {
        console.log("Error: ", error)
        return res.send({status: false, message: "Network error"});
    }
}
export const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    
    if (!bookingId) return res.send({status: false, message: "Booking id not found!"});

    try {
        const booking = await Booking.findByIdAndDelete({ _id: bookingId });

        if (!booking) return res.send({ status: false, message: "Booking not found or maybe deleted" });

        return res.send({ status: true, message: "Booking has been deleted" })

    } catch (error) {
        console.log("Error: ", error);
    }
}

const validStatuses = ['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'];

export const createMarketplaceBooking = async (req, res) => {
    try {
        const { technicianId, deviceCategory, serviceRequested, issueDescription, scheduledDate, scheduledTime } = req.body;
        if (!technicianId || !deviceCategory || !serviceRequested || !scheduledDate || !scheduledTime) {
            return res.status(400).json({ status: false, message: 'Technician, service, category, date, and time are required' });
        }
        const profile = await TechnicianProfile.findOne({ _id: technicianId, verificationStatus: 'verified' });
        if (!profile) return res.status(404).json({ status: false, message: 'Verified technician not found' });
        const service = profile.servicesOffered.find(item => item.name === serviceRequested && item.category === deviceCategory);
        if (!service) return res.status(400).json({ status: false, message: 'That service is not offered by this technician' });
        const day = new Date(`${scheduledDate}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long' });
        const slot = profile.availability.find(item => item.day.toLowerCase().startsWith(day.slice(0, 3).toLowerCase()));
        if (!slot || scheduledTime < slot.from || scheduledTime > slot.to) return res.status(400).json({ status: false, message: 'Selected time is outside the technician availability' });
        const conflict = await Booking.exists({ technicianId, scheduledDate, scheduledTime, status: { $in: ['pending', 'accepted', 'in_progress'] } });
        if (conflict) return res.status(409).json({ status: false, message: 'That appointment slot is already requested' });
        const booking = await Booking.create({ customerId: req.user._id, technicianId, deviceCategory, serviceRequested, issueDescription, scheduledDate, scheduledTime, price: service.price });
        await booking.populate([{ path: 'customerId', select: 'name email phone' }, { path: 'technicianId', populate: { path: 'userId', select: 'name email phone' } }]);
        return res.status(201).json({ status: true, booking });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message || 'Unable to create booking' });
    }
};

export const marketplaceBookings = async (req, res) => {
    const filter = req.user.role === 'customer' ? { customerId: req.user._id } : req.user.role === 'technician' ? { technicianId: req.query.technicianId } : {};
    if (req.user.role === 'technician') {
        const profile = await TechnicianProfile.findOne({ userId: req.user._id });
        if (!profile) return res.json({ status: true, bookings: [] });
        filter.technicianId = profile._id;
    }
    const bookings = await Booking.find(filter).populate('customerId', 'name email phone').populate({ path: 'technicianId', populate: { path: 'userId', select: 'name email phone' } }).sort({ createdAt: -1 });
    return res.json({ status: true, bookings });
};

export const updateMarketplaceBookingStatus = async (req, res) => {
    const { status } = req.body;
    if (!validStatuses.includes(status) || status === 'pending' || status === 'cancelled') return res.status(400).json({ status: false, message: 'Invalid technician status' });
    const profile = await TechnicianProfile.findOne({ userId: req.user._id });
    const booking = await Booking.findOneAndUpdate({ _id: req.params.id, technicianId: profile?._id }, { status }, { new: true }).populate('customerId', 'name email phone');
    if (!booking) return res.status(404).json({ status: false, message: 'Booking not found' });
    return res.json({ status: true, booking });
};
