import express from "express";
import { 
  registerForEvent,
  getAllRegistrations,
  getEventRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration
} from "../controllers/registrationController.js";

const router = express.Router();

// Route to register a user for an event
router.post("/register", registerForEvent);

// Route to get all registrations
router.get("/", getAllRegistrations);

// Route to get all registrations for a specific event
router.get("/event/:eventId", getEventRegistrations);

// Route to get a single registration by ID
router.get("/:registrationId", getRegistrationById);

// Route to update a registration by ID
router.put("/:registrationId", updateRegistration);

// Route to delete a registration by ID
router.delete("/:registrationId", deleteRegistration);

export default router;
