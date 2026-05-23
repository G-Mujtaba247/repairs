import express from "express";
import {
    createRepairer,
    allRepairers,
    updateRepairer,
    deleteRepairer,
    seedRepairers
} from "../controllers/repairerController.js";
import { validateRepairer } from "../middleware/validation.js";

const repairerRouter = express.Router();

// Public routes for website
repairerRouter.get("/website/repairers", allRepairers);
repairerRouter.post("/website/repairers/seed", seedRepairers);

// Admin routes
repairerRouter.get("/repairers", allRepairers);
repairerRouter.post("/repairers/create", validateRepairer, createRepairer);
repairerRouter.patch("/repairers/update", validateRepairer, updateRepairer);
repairerRouter.delete("/repairers/delete/:repairerId", deleteRepairer);

export default repairerRouter;
