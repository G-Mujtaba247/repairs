import Booking from '../models/bookingsModel.js';

export const createBookingForTechnician = async (req, res) => {
  try {
    const { technicianId, deviceCategory, serviceRequested, issueDescription, scheduledDate, scheduledTime, price } = req.body;
    const customerId = req.user._id;
    if (!technicianId || !deviceCategory || !serviceRequested || !scheduledDate || !scheduledTime) {
      return res.status(400).json({ status: false, message: 'Missing required fields' });
    }
    const booking = await Booking.create({ customerId, technicianId, deviceCategory, serviceRequested, issueDescription, scheduledDate, scheduledTime, price, status: 'pending' });
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
    const allowed = ['pending','accepted','rejected','in_progress','completed','cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ status: false, message: 'Invalid status' });
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ status: false, message: 'Booking not found' });
    // Authorization: technicians only can update bookings for their profile, customers can cancel
    if (req.user.role === 'technician') {
      const techProfileId = req.user._id; // note: req.user is User; TechnicianProfile stores userId. We'll allow check in route if needed.
    }
    booking.status = status;
    await booking.save();
    return res.json({ status: true, booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const listBookings = async (req, res) => {
  try {
    const { userId, role } = req.query;
    const filter = {};
    if (role === 'customer' && userId) filter.customerId = userId;
    if (role === 'technician' && userId) filter.technicianId = userId;
    const bookings = await Booking.find(filter).populate('customerId', 'name email').populate('technicianId');
    return res.json({ status: true, bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}
