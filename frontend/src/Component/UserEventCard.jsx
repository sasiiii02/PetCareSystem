import { Link, useNavigate } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const UserEventCard = ({ event }) => {
  const navigate = useNavigate();
  
  // Function to handle navigating to Event Details page
  const handleViewDetails = () => {
    navigate(`/event/${event._id}`); // Navigate to event details
  };
  
  // Theme settings - keeping the same colors as PetServices
  const theme = {
    primary: "bg-[#D08860]",
    secondary: "bg-[#B3714E]",
    textPrimary: "text-white",
    textSecondary: "text-amber-950",
    accent: "bg-amber-100",
    border: "border-amber-200",
  };
  
  return (
    <div className="overflow-hidden rounded-xl shadow-lg bg-white flex flex-col transition-all duration-300 hover:shadow-xl border border-gray-100 group">
      {/* Image with overlay gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={event.image || "/default-event.jpg"}
          alt={event.title}
          className="w-full h-56 object-cover"
          onClick={handleViewDetails}
        />
        <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">
          {event.date}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        </div>
        
        {/* Event details with icons */}
        <div className="flex items-center mb-3">
          <FaClock className="text-gray-400 mr-2" size={14} />
          <span className="text-sm text-gray-600">{event.time}</span>
        </div>
        
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-gray-400 mr-2" size={14} />
          <span className="text-sm text-gray-600">{event.location}</span>
        </div>
        
        {/* Button at the bottom */}
        <div className="mt-auto">
          <button
            onClick={handleViewDetails}
            className={`w-full py-2.5 text-center font-medium rounded-lg transition-all ${theme.primary} ${theme.textPrimary} hover:${theme.secondary} flex items-center justify-center`}
          >
            View Details <FaArrowRight className="ml-2" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEventCard;