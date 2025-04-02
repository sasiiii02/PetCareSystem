import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // Store as string or Date
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  eventImageURL: { type: String, required: true }, // Store image URL
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Reference to the Admin model
    required: true,
  },
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

export default Event;
