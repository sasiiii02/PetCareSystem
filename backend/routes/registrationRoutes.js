import express from "express";
import { 
  registerForEvent,
  getUserRegistrations,
  getEventRegistrations,
  updateRegistration,
  deleteRegistration
} from "../controllers/registrationController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// All registration routes require authentication
router.use(auth);

router.post("/register", registerForEvent);
router.get("/", getUserRegistrations);
router.get("/event/:eventId", getEventRegistrations);
router.put("/:registrationId", updateRegistration);
router.delete("/:registrationId", deleteRegistration);

export default router;
