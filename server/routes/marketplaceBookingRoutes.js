import express from 'express';
import { createBookingForTechnician, updateBookingStatus, listBookings, getBookingById } from '../controllers/marketplaceBookingController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/bookings', requireAuth, createBookingForTechnician);
router.get('/bookings', requireAuth, listBookings);
router.get('/bookings/:id', requireAuth, getBookingById);
router.patch('/bookings/:id/status', requireAuth, updateBookingStatus);

export default router;
