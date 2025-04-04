const express = require("express");
const router = express.Router();
const { addPet, getAllPets, getPetById, updatePet, deletePet } = require("../controllers/forAdoptionControllers");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

router.post("/", upload.single("petImage"), addPet); // Accept image upload
router.get("/", getAllPets);
router.get("/:id", getPetById);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

module.exports = router;
