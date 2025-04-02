import mongoose from "mongoose";

const eventNotificationSchema = new mongoose.Schema({
  organizerId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Reference to event organizer (admin)
    required: true 
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event",
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,  
    ref: "User",  
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
}, { timestamps: true });

export default mongoose.model("EventNotification", eventNotificationSchema);
