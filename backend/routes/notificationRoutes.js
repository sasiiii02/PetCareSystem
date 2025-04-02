import express from "express";
import { sendNotification, getUserNotifications } from "../controllers/notificationController.js";
import adminAuth from "../middleware/adminAuthMiddleware.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Organizer sends notifications to all registered users
router.post("/:eventId/notify", adminAuth, sendNotification);

// User fetches their notifications
router.get("/notifications", userAuth, getUserNotifications);

export default router;
