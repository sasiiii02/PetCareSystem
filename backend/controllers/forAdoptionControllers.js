import ForAdoption from "../models/ForAdoption.js";
import multer from "multer";
import path from "path";

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
export const upload = multer({ storage }); // Export the upload instance

// Add a pet for adoption (with image)
export const addPet = async (req, res) => {
    try {
        const {
            ownerFirstName,
            ownerLastName,
            email,
            phone,
            petName,
            petAge,
            petGender,
            petBreed,
            petSpecies,
            petDescription,
            reason,
            specialNeeds,
            vaccinated,
            neutered
        } = req.body;

        const newPet = new ForAdoption({
            ownerFirstName,
            ownerLastName,
            email,
            phone,
            petName,
            petAge,
            petGender,
            petBreed,
            petSpecies,
            petDescription,
            reason,
            specialNeeds,
            vaccinated,
            neutered,
            petImage: req.file ? `/uploads/${req.file.filename}` : null,
        });

        await newPet.save();
        res.status(201).json({ message: "Pet added for adoption successfully", newPet });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all pets available for adoption
export const getAllPets = async (req, res) => {
    try {
        const pets = await ForAdoption.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single pet by ID
export const getPetById = async (req, res) => {
    try {
        const pet = await ForAdoption.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update pet details
export const updatePet = async (req, res) => {
    try {
        const updatedPet = await ForAdoption.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json({ message: "Pet updated successfully", updatedPet });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a pet
export const deletePet = async (req, res) => {
    try {
        const deletedPet = await ForAdoption.findByIdAndDelete(req.params.id);
        if (!deletedPet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
