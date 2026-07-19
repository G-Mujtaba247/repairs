import express from 'express';
import { createBookingForTechnician, updateBookingStatus, listBookings } from '../controllers/marketplaceBookingController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/bookings', requireAuth, createBookingForTechnician);
router.patch('/bookings/:id/status', requireAuth, updateBookingStatus);
router.get('/bookings', requireAuth, listBookings);

export default router;
