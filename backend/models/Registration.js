import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
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
  name: { type: String, required: true }, 
  email: { type: String, required: true }, 
  tickets: { type: Number, required: true, default: 1 },
  registeredAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
