import express from 'express';
import { contactUsDetail, contactUs } from '../controllers/contactUsController.js';
import { validateContactUs } from '../middleware/validation.js';

const contactUsRouter = express.Router();

contactUsRouter.get('/website/contactus', contactUsDetail);

contactUsRouter.get('/contactus', contactUsDetail);
contactUsRouter.post('/contactus/create', validateContactUs, contactUs);
contactUsRouter.patch('/contactus/update/:id', validateContactUs, contactUs);

export default contactUsRouter;