import express from "express";
import { adminLogin, getAdminDetails } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuthMiddleware.js"; // Admin authentication middleware

const router = express.Router();

// Admin login route
router.post("/login", adminLogin);

// Protected route: Get admin details (requires authentication)
router.get("/profile", adminAuth, getAdminDetails);

export default router;
