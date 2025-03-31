import express from "express";
import { 
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  getEventById // Import the function to get event by ID
} from "../controllers/eventController.js";

const router = express.Router();

// Route to create a new event
router.post("/create", createEvent);

// Route to get all events
router.get("/", getAllEvents);

// Route to get a single event by ID
router.get("/:eventId", getEventById); 

// Route to update an event by ID
router.put('/:eventId', updateEvent);

// Route to delete an event by ID
router.delete("/:eventId", deleteEvent);

export default router;
