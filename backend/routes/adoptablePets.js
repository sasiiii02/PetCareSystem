import express from 'express';
import AdoptablePet from '../models/AdoptablePet.js';

const router = express.Router();

// POST endpoint to add a pet to adoptable pets collection
router.post('/api/adoptablepets', async (req, res) => {
  try {
    const newAdoptablePet = new AdoptablePet(req.body);
    const savedPet = await newAdoptablePet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    console.error('Error saving adoptable pet:', error);
    res.status(500).json({ message: 'Error adding pet to adoptable list', error: error.message });
  }
});

export default router;
