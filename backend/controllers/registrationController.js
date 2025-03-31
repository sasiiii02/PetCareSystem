import Registration from "../models/Registration.js";
import { v4 as uuidv4 } from "uuid";

// Register a user for an event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId, name, email, tickets } = req.body;

    // Validate required fields
    if (!eventId || !name || !email || !tickets) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const userId = uuidv4(); // Generate a unique user ID for guest users

    const newRegistration = new Registration({
      eventId,
      userId,
      name,
      email,
      tickets
    });

    // Save registration to database
    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      registration: newRegistration
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to register for event."
    });
  }
};

// Get all registrations
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find(); // Fetch all registrations from DB

    res.status(200).json({
      success: true,
      registrations
    });
  } catch (error) {
    console.error("Error retrieving registrations:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve registrations."
    });
  }
};

// Get all registrations for a specific event
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params; // Get eventId from URL params

    const registrations = await Registration.find({ eventId });

    if (registrations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No registrations found for this event."
      });
    }

    res.status(200).json({
      success: true,
      registrations
    });
  } catch (error) {
    console.error("Error retrieving event registrations:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve event registrations."
    });
  }
};

// Get registration by ID
export const getRegistrationById = async (req, res) => {
  try {
    const { registrationId } = req.params; // Get registration ID from URL params

    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found"
      });
    }

    res.status(200).json({
      success: true,
      registration
    });
  } catch (error) {
    console.error("Error retrieving registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve registration."
    });
  }
};

// Delete a registration
export const deleteRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params; // Get registrationId from URL params

    const registration = await Registration.findByIdAndDelete(registrationId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to delete registration."
    });
  }
};

// Update registration details (optional)
export const updateRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { name, email, tickets } = req.body;

    // Validate required fields
    if (!name || !email || !tickets) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      { name, email, tickets },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    res.status(200).json({
      success: true,
      message: "Registration updated successfully",
      registration: updatedRegistration
    });
  } catch (error) {
    console.error("Error updating registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to update registration."
    });
  }
};
