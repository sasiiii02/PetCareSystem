import { useEffect, useState } from "react";
import UserEventCard from "../Component/UserEventCard";
import axios from "axios";

const UserEventsPage = () => {
  const [events, setEvents] = useState([]); // State to store events

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events"); // Make the API call
        setEvents(response.data.events); // Set the fetched events to state
      } catch (error) {
        console.error("Error fetching events:", error); // Log any errors
      }
    };

    fetchEvents(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="p-6 pt-28">
      <h2 className="text-2xl font-bold text-amber-950 mb-6">Upcoming Pet Events</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <UserEventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No events available at the moment.</p> // Display message if no events are found
        )}
      </div>
    </div>
  );
};

export default UserEventsPage;
