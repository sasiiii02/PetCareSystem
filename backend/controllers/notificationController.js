import EventNotification from "../models/EventNotification.js";
import Registration from "../models/Registration.js";

// Send notification to all registered users for an event
export const sendNotification = async (req, res) => {
  try {
    const { eventId } = req.params; // Get event ID
    const { content } = req.body; // Get message content
    const organizerId = req.adminId; // Organizer sending the notification

    if (!content) {
      return res.status(400).json({ message: "Notification content is required." });
    }

    // Get registered users for the event
    const registrations = await Registration.find({ eventId }).select("userId");

    if (!registrations.length) {
      return res.status(404).json({ message: "No registered users for this event." });
    }

    // Create notifications for all registered users
    const notifications = registrations.map((registration) => ({
      organizerId,
      eventId,
      userId: registration.userId,
      content,
    }));

    await EventNotification.insertMany(notifications);

    res.status(201).json({
      success: true,
      message: "Notifications sent successfully!",
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to send notifications.",
    });
  }
};

// Get notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.userId; // User making the request

    const notifications = await EventNotification.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve notifications.",
    });
  }
};
