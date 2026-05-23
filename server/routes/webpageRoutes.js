import express from 'express';
import { websitePages, websitePageDetails, createWebpages, deleteWebpage, detailWebpage, listWebpages, updateWebpage } from '../controllers/webpageController.js';
import { validateWebpage } from '../middleware/validation.js';

const webpageRouter = express.Router();

webpageRouter.get('/website/webpages', websitePages);
webpageRouter.get('/website/webpages/:slug', websitePageDetails);

webpageRouter.get('/webpages', listWebpages);
webpageRouter.post('/webpages/create', validateWebpage, createWebpages);
webpageRouter.get('/webpages/:id', detailWebpage);
webpageRouter.patch('/webpages/update/:id', validateWebpage, updateWebpage);
webpageRouter.delete('/webpages/delete/:id', deleteWebpage);

export default webpageRouter;