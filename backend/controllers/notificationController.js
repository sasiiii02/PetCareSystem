import EventNotification from "../models/eventNotification.js";

// Send notification to users for an event
export const sendEventNotification = async (req, res) => {
  try {
    const { userId, eventId, content } = req.body;

    // Validate required fields
    if (!userId || !eventId || !content) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID, event ID, and content are required." 
      });
    }

    const newNotification = new EventNotification({
      userId, // Stored as string (UUID)
      eventId, // Stored as ObjectId
      content
    });

    await newNotification.save();

    res.status(201).json({
      success: true,
      message: "Notification sent successfully!",
      notification: newNotification
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to send notification."
    });
  }
};

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await EventNotification.find().populate('eventId'); // Removed userId populate

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve notifications."
    });
  }
};

// Get all notifications for a specific event
export const getEventNotifications = async (req, res) => {
  try {
    const { eventId } = req.params;

    const notifications = await EventNotification.find({ eventId }).populate('eventId'); // Removed userId populate

    if (notifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notifications found for this event."
      });
    }

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error("Error retrieving event notifications:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve event notifications."
    });
  }
};

// Get notifications for a specific user
export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await EventNotification.find({ userId })
      .populate('eventId') // Only populate eventId
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error("Error retrieving user notifications:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve user notifications."
    });
  }
};

// Other methods remain the same since they work with notificationId (ObjectId)
export const getNotificationById = async (req, res) => {
  /* ... unchanged ... */
};

export const markNotificationAsRead = async (req, res) => {
  /* ... unchanged ... */
};

export const deleteNotification = async (req, res) => {
  /* ... unchanged ... */
};