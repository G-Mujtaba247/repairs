import Booking from '../models/bookingsModel.js';
import TechnicianProfile from '../models/technicianProfileModel.js';

export const createBookingForTechnician = async (req, res) => {
  try {
    const { technicianId, deviceCategory, serviceRequested, issueDescription, scheduledDate, scheduledTime, price } = req.body;
    const customerId = req.user._id;
    
    if (!technicianId || !deviceCategory || !serviceRequested || !scheduledDate || !scheduledTime) {
      return res.status(400).json({ status: false, message: 'Missing required fields' });
    }

    // Verify technician exists and is verified
    const technicianProfile = await TechnicianProfile.findById(technicianId);
    if (!technicianProfile) {
      return res.status(404).json({ status: false, message: 'Technician not found' });
    }

    const booking = await Booking.create({
      customerId,
      technicianId,
      deviceCategory,
      serviceRequested,
      issueDescription,
      scheduledDate,
      scheduledTime,
      price,
      status: 'pending'
    });

    await booking.populate('customerId', 'name email phone');
    await booking.populate('technicianId');

    return res.json({ status: true, booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;
    const allowed = ['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'];
    
    if (!allowed.includes(status)) {
      return res.status(400).json({ status: false, message: 'Invalid status' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ status: false, message: 'Booking not found' });
    }

    // Authorization: technicians can accept/reject/update their own bookings, customers can cancel
    if (req.user.role === 'technician') {
      const techProfile = await TechnicianProfile.findOne({ userId: req.user._id });
      if (!techProfile || techProfile._id.toString() !== booking.technicianId.toString()) {
        return res.status(403).json({ status: false, message: 'Unauthorized' });
      }
      // Technicians can change pending->accepted/rejected, or update in_progress->completed
      const validTransitions = ['pending', 'in_progress'];
      if (!validTransitions.includes(booking.status)) {
        return res.status(400).json({ status: false, message: 'Cannot update booking in current status' });
      }
    } else if (req.user.role === 'customer') {
      if (booking.customerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ status: false, message: 'Unauthorized' });
      }
      // Customers can only cancel pending/accepted bookings
      if (!['pending', 'accepted'].includes(booking.status)) {
        return res.status(400).json({ status: false, message: 'Cannot cancel booking in current status' });
      }
      if (status !== 'cancelled') {
        return res.status(400).json({ status: false, message: 'Customers can only cancel bookings' });
      }
    }

    booking.status = status;
    await booking.save();

    await booking.populate('customerId', 'name email phone');
    await booking.populate('technicianId');

    return res.json({ status: true, booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const listBookings = async (req, res) => {
  try {
    const { role } = req.query;
    let filter = {};

    if (role === 'customer') {
      filter.customerId = req.user._id;
    } else if (role === 'technician') {
      // Find technician profile for this user
      const techProfile = await TechnicianProfile.findOne({ userId: req.user._id });
      if (!techProfile) {
        return res.status(404).json({ status: false, message: 'Technician profile not found' });
      }
      filter.technicianId = techProfile._id;
    } else {
      return res.status(400).json({ status: false, message: 'Invalid role' });
    }

    const bookings = await Booking.find(filter)
      .populate('customerId', 'name email phone')
      .populate({
        path: 'technicianId',
        populate: { path: 'userId', select: 'name email phone' }
      })
      .sort({ createdAt: -1 });

    return res.json({ status: true, bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId)
      .populate('customerId', 'name email phone')
      .populate({
        path: 'technicianId',
        populate: { path: 'userId', select: 'name email phone' }
      });

    if (!booking) {
      return res.status(404).json({ status: false, message: 'Booking not found' });
    }

    // Check authorization
    const isCustomer = booking.customerId._id.toString() === req.user._id.toString();
    const techProfile = await TechnicianProfile.findOne({ userId: req.user._id });
    const isTechnician = techProfile && techProfile._id.toString() === booking.technicianId.toString();

    if (!isCustomer && !isTechnician && req.user.role !== 'admin') {
      return res.status(403).json({ status: false, message: 'Unauthorized' });
    }

    return res.json({ status: true, booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}
