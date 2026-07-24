import express from 'express';
import { createProfile, createOrUpdateProfile, getTechnician, listTechnicians, searchTechnicians, verifyTechnician, suspendTechnician } from '../controllers/technicianController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/technicians', listTechnicians);
router.get('/technicians/search', searchTechnicians);
router.get('/technicians/:id', getTechnician);

// Technician routes (protected)
router.post('/technicians', requireAuth, requireRole(['technician']), createProfile);
router.put('/technicians/:id', requireAuth, requireRole(['technician']), createOrUpdateProfile);

// Admin routes (protected)
router.patch('/technicians/:id/verify', requireAuth, requireRole(['admin']), verifyTechnician);
router.patch('/technicians/:id/suspend', requireAuth, requireRole(['admin']), suspendTechnician);

export default router;
