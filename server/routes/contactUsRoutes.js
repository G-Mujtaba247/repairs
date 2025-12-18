import express from 'express';
import { contactUsDetail, contactUs } from '../controllers/contactUsController.js';

const contactUsRouter = express.Router();

contactUsRouter.get('/website/contactus', contactUsDetail);

contactUsRouter.get('/contactus', contactUsDetail);
contactUsRouter.post('/contactus/create', contactUs);
contactUsRouter.patch('/contactus/update/:id', contactUs);

export default contactUsRouter;