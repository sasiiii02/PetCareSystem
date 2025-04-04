const express = require("express");
const multer = require("multer");
const {
  createAdoptablePet,
  getAllAdoptablePets,
  updateAdoptablePet,
  deleteAdoptablePet
} = require("../controllers/adoptablePetControllers");

const router = express.Router();

// Image Storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("Pet_Image"), createAdoptablePet);
router.get("/", getAllAdoptablePets);
router.put("/:id", updateAdoptablePet);
router.delete("/:id", deleteAdoptablePet);

module.exports = router;
