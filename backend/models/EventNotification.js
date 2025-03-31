const mongoose = require("mongoose");

const eventNotificationSchema = new mongoose.Schema({
  userId: { 
    type: String,  // Changed from ObjectId to String
    required: true 
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId, // Keep as ObjectId if events use MongoDB IDs
    ref: "Event",
    required: true
  },
  content: {
    type: String, 
    required: true 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true,
  collection: 'event_notifications'
});

// Add index for faster queries
eventNotificationSchema.index({ userId: 1, isRead: 1 });

module.exports = mongoose.model("EventNotification", eventNotificationSchema);