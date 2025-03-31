import { Link, useNavigate } from "react-router-dom";

const UserEventCard = ({ event }) => {
  const navigate = useNavigate();

  // Function to handle navigating to Event Details page
  const handleViewDetails = () => {
    navigate(`/event/${event.id}`); // Navigate to event details
  };

  return (
    <div className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={event.image || "/default-event.jpg"}
        alt={event.title}
        className="w-full h-40 object-cover"
        onClick={handleViewDetails} // Clicking the card also navigates to event details
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-amber-950">{event.title}</h3>
        <p className="text-gray-700">{event.date} • {event.time}</p>
        <p className="text-sm text-gray-600">{event.location}</p>

        <div className="mt-3 flex justify-center">
          {/* View Details Button */}
          <button
            onClick={handleViewDetails}
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEventCard;
