import { useEffect, useState } from "react";
import UserEventCard from "../Component/UserEventCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check for token

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/events/");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
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
    <div className="bg-amber-50 min-h-screen p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-amber-950 mb-2">Upcoming Pet Events</h2>
            <p className="text-gray-600 max-w-2xl">
              Join our community events and connect with fellow pet lovers. Find workshops, adoption drives, and fun gatherings for you and your furry friends.
            </p>
          </div>
          <button
            onClick={handleViewRegisteredEvents}
            disabled={!token} // Disable if not logged in
            className={`mt-4 md:mt-0 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 shadow-md ${
              token
                ? "bg-amber-700 hover:bg-amber-800 hover:shadow-lg"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              View My Registered Events
            </div>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <UserEventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow text-center">
                <img
                  src="/empty-events.svg" // You can replace with an actual image path
                  alt="No events"
                  className="w-40 h-40 mx-auto mb-4 opacity-60"
                />
                <p className="text-lg text-gray-600">No events available at the moment.</p>
                <p className="text-gray-500 mt-2">Check back soon for upcoming pet events!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserEventsPage;