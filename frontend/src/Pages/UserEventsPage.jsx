import { useEffect, useState } from "react";
import UserEventCard from "../Component/UserEventCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaCalendar, FaFilter, FaPaw } from "react-icons/fa";

const UserEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check for token

  // Theme settings - matching PetServices
  const theme = {
    primary: "bg-[#D08860]",
    secondary: "bg-[#B3714E]",
    textPrimary: "text-white",
    textSecondary: "text-amber-950",
    accent: "bg-amber-100",
    border: "border-amber-200",
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/events/");
        setEvents(response.data.events);
        setFilteredEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  useEffect(() => {
    // Filter events based on search term
    const results = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm, events]);

  const handleViewRegisteredEvents = () => {
    if (token) {
      navigate("/my-events");
    } else {
      alert("Please log in to view your registered events.");
      navigate("/"); // Optional: redirect to login
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className={`${theme.accent} rounded-2xl p-6 md:p-10 mb-8 shadow-md mt-30`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-amber-900">Upcoming Pet Events</h1>
          <p className="text-center text-amber-800 mb-6 max-w-2xl mx-auto">
            Join our community events and connect with fellow pet lovers. Find workshops, adoption drives, and fun gatherings for you and your furry friends.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, location or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <button className={`px-4 py-2 rounded-full shadow-md flex items-center ${theme.primary} ${theme.textPrimary} hover:${theme.secondary} transition-all duration-300`}>
              <FaPaw className="mr-2" /> All Events
            </button>
            <button className="px-4 py-2 rounded-full shadow-md flex items-center bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all duration-300">
              <FaFilter className="mr-2" /> Filter
            </button>
          </div>
          
          <button
            onClick={handleViewRegisteredEvents}
            disabled={!token}
            className={`px-6 py-3 rounded-full text-white font-medium transition-all duration-300 shadow-md flex items-center ${
              token
                ? `${theme.primary} hover:${theme.secondary}`
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <FaCalendar className="mr-2" />
            My Registered Events
          </button>
        </div>

        {/* Search Results Count */}
        {!loading && (
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg text-amber-900 font-medium">
              {searchTerm ? "Search Results" : "All Events"}
            </h3>
            <span className={`${theme.accent} text-amber-800 px-4 py-1 rounded-full text-sm font-medium`}>
              {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"} {searchTerm && "Found"}
            </span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-[#D08860]`}></div>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <UserEventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <img
                  src="/empty-events.svg"
                  alt="No events"
                  className="w-40 h-40 mx-auto mb-4 opacity-60"
                />
                <p className="text-lg text-gray-600">
                  {searchTerm ? "No events match your search criteria" : "No events available at the moment."}
                </p>
                <p className="text-gray-500 mt-2">
                  {searchTerm ? "Try using different keywords" : "Check back soon for upcoming pet events!"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserEventsPage;