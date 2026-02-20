import express from 'express';
import { createBooking, allBooking, updateBooking, deleteBooking } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/website/bookings/create', createBooking);

bookingRouter.get('/bookings', allBooking);
bookingRouter.patch('/bookings/update', updateBooking);
bookingRouter.delete('/bookings/delete/:bookingId', deleteBooking);

export default bookingRouter;