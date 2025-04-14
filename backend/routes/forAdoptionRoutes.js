import express from "express";
import multer from "multer";
import {
  addPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet
} from "../controllers/forAdoptionControllers.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("petImage"), addPet); // Accept image upload
router.get("/", getAllPets);
router.get("/:id", getPetById);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

export default router;
