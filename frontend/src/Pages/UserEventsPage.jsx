import { useEffect, useState } from "react";
import UserEventCard from "../Component/UserEventCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserEventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check for token

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleViewRegisteredEvents = () => {
    if (token) {
      navigate("/my-events");
    } else {
      alert("Please log in to view your registered events.");
      navigate("/"); // Optional: redirect to login
    }
  };

  return (
    <div className="p-6 pt-28">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-950">Upcoming Pet Events</h2>
        <button
          onClick={handleViewRegisteredEvents}
          disabled={!token} // Disable if not logged in
          className={`px-4 py-2 rounded text-white ${
            token
              ? "bg-amber-700 hover:bg-amber-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          View My Registered Events
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <UserEventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No events available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default UserEventsPage;