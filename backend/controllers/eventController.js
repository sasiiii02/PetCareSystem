import Event from "../models/Event.js";

// Create an event
export const createEvent = async (req, res) => {
  try {
    const { title, date, time, location, description, eventImageURL } = req.body;

    // Validate required fields
    if (!title || !date || !time || !location || !description || !eventImageURL) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new event instance
    const newEvent = new Event({
      title,
      date,
      time,
      location,
      description,
      eventImageURL,
    });

    // Save to database
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to create event.",
    });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from DB
    res.status(200).json({
      success: true,
      events, // Ensure events are being returned in the response
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve events.",
    });
  }
};

//get event by id
export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params; // Get eventId from the URL params

    // Find the event by its ID
    const event = await Event.findById(eventId);

    // If event is not found
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Return the event details
    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to retrieve event.",
    });
  }
};


// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params; // Get eventId from the URL params

    // Find and delete the event by its ID
    const event = await Event.findByIdAndDelete(eventId);

    // If event is not found
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to delete event.",
    });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;  // Get the eventId from URL parameters
    const { title, date, time, location, description, eventImageURL } = req.body;

    // Validate required fields
    if (!title || !date || !time || !location || !description || !eventImageURL) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find and update the event by its ID
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId, 
      { title, date, time, location, description, eventImageURL },
      { new: true }  // This option will return the updated document
    );

    // If event is not found
    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Return the updated event
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Failed to update event.",
    });
  }
};