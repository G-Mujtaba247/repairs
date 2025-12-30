import express from 'express';
import { settingsDetail, settings } from '../controllers/settingsController.js';

const settingsRouter = express.Router();

settingsRouter.get('/website/settings', settingsDetail);

settingsRouter.get('/settings', settingsDetail);
settingsRouter.post('/settings/create', settings);
settingsRouter.patch('/settings/update/:id', settings);

export default settingsRouter;