import express from 'express';
import { createOrUpdateProfile, getTechnician, listTechnicians, verifyTechnician } from '../controllers/technicianController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/technicians', listTechnicians);
router.get('/technicians/:id', getTechnician);
router.put('/technicians/:id', requireAuth, requireRole(['technician']), createOrUpdateProfile);
router.patch('/technicians/:id/verify', requireAuth, requireRole(['admin']), verifyTechnician);

export default router;
