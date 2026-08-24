import express from 'express';
import { createBooking, allBooking, updateBooking, deleteBooking, createMarketplaceBooking, marketplaceBookings, updateMarketplaceBookingStatus } from '../controllers/bookingController.js';
import { validateBooking } from '../middleware/validation.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const bookingRouter = express.Router();

bookingRouter.post('/website/bookings/create', validateBooking, createBooking);
bookingRouter.post('/bookings', requireAuth, requireRole(['customer']), createMarketplaceBooking);
bookingRouter.get('/bookings', requireAuth, marketplaceBookings);
bookingRouter.patch('/bookings/:id/status', requireAuth, requireRole(['technician']), updateMarketplaceBookingStatus);

bookingRouter.get('/bookings', allBooking);
bookingRouter.patch('/bookings/update', updateBooking);
bookingRouter.delete('/bookings/delete/:bookingId', deleteBooking);

export default bookingRouter;