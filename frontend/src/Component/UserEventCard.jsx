import { Link, useNavigate } from "react-router-dom";

const UserEventCard = ({ event }) => {
  const navigate = useNavigate();
  
  // Function to handle navigating to Event Details page
  const handleViewDetails = () => {
    navigate(`/event/${event._id}`); // Navigate to event details
  };
  
  return (
    <div className="cursor-pointer bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={event.image || "/default-event.jpg"}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
          onClick={handleViewDetails}
        />
        <div className="absolute top-3 right-3 bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-xs font-medium">
          {event.date}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-amber-950 mb-2">{event.title}</h3>
        
        <div className="flex items-center space-x-1 text-gray-600 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{event.time}</p>
        </div>
        
        <div className="flex items-center space-x-1 text-gray-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">{event.location}</p>
        </div>
        
        <div className="mt-3 flex justify-center">
          {/* View Details Button */}
          <button
            onClick={handleViewDetails}
            className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors duration-300 shadow-md hover:shadow-lg w-full font-medium flex items-center justify-center"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEventCard;