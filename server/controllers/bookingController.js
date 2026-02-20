import Booking from "../models/bookingsModel.js";
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
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
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
