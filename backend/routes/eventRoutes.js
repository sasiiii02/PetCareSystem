import express from "express";
import { 
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  getEventById 
} from "../controllers/eventController.js";
import adminAuth from "../middleware/adminAuthMiddleware.js"; // Import authentication middleware

const router = express.Router();

// Route to create a new event (only admins can create)
router.post("/create", adminAuth, createEvent);

// Route to get all events (open to all users)
router.get("/", getAllEvents);

// Route to get a single event by ID (open to all users)
router.get("/:eventId", getEventById); 

// Route to update an event by ID (only admins can update)
router.put("/:eventId", adminAuth, updateEvent);

// Route to delete an event by ID (only admins can delete)
router.delete("/:eventId", adminAuth, deleteEvent);

export default router;
