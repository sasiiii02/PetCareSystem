import Registration from "../models/Registration.js";
import User from "../models/User.js";

// Register a user for an event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;
    
    // Debug: Check what's in req.user
    console.log('User object from token:', req.user);
    
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const userId = req.user.userId; // Changed from req.user.id to req.user.userId

    // Validate required fields
    if (!eventId || !tickets) {
      return res.status(400).json({ 
        success: false, 
        message: "Event ID and tickets are required." 
      });
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({ eventId, userId });
    if (existingRegistration) {
      return res.status(400).json({ 
        success: false, 
        message: "User is already registered for this event." 
      });
    }

    // Get user details from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    const newRegistration = new Registration({
      eventId,
      userId,
      name: user.name,
      email: user.email,
      tickets
    });

    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      registration: newRegistration
    });
  } catch (error) {
    console.error("Full error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to register for event.",
      error: error.message
    });
  }
};

// Get all registrations for the logged-in user
export const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.userId; // Access userId from logged-in user

    const registrations = await Registration.find({ userId }).populate("eventId", "title date location");

    res.status(200).json({
      success: true,
      registrations
    });
  } catch (error) {
    console.error("Error retrieving user registrations:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve registrations."
    });
  }
};

// Get all registrations for a specific event
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({ eventId }).populate("userId", "name email");

    if (!registrations.length) {
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

// Delete a registration (Only the user who registered can delete)
export const deleteRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const userId = req.user.userId; // Access userId from logged-in user

    const registration = await Registration.findOneAndDelete({ _id: registrationId, userId });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found or unauthorized to delete"
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

// Update registration details (Only the user who registered can update)
export const updateRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { tickets } = req.body;
    const userId = req.user.userId; // Changed from req.user.id to req.user.userId

    console.log(`Attempting to update registration ${registrationId} for user ${userId}`); // Debug log

    if (!tickets) {
      return res.status(400).json({ 
        success: false, 
        message: "Tickets field is required." 
      });
    }

    // First verify the registration exists and belongs to user
    const existingRegistration = await Registration.findOne({
      _id: registrationId,
      userId: userId
    });

    if (!existingRegistration) {
      console.log(`Registration not found: ${registrationId} for user ${userId}`); // Debug log
      return res.status(404).json({
        success: false,
        message: "Registration not found or unauthorized to update"
      });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      { tickets },
      { new: true }
    ).populate('eventId', 'title date location'); // Optional: populate event details

    console.log('Updated registration:', updatedRegistration); // Debug log

    res.status(200).json({
      success: true,
      message: "Registration updated successfully",
      registration: updatedRegistration
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to update registration.",
      error: error.message
    });
  }
};
