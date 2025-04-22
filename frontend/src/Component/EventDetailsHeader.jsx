import React from 'react';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const EventDetailsHeader = ({ event }) => {
  // Theme settings - matching PetServices
  const theme = {
    primary: "bg-[#D08860]",
    secondary: "bg-[#B3714E]",
    textPrimary: "text-white",
    textSecondary: "text-amber-950",
    accent: "bg-amber-100",
    border: "border-amber-200",
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">{event.title}</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-6 mb-4">
          <div className="flex items-center">
            <FaCalendar className="text-[#D08860] mr-2" />
            <span className="text-lg font-semibold text-gray-700">{event.date}</span>
          </div>
          
          <div className="flex items-center">
            <FaClock className="text-[#D08860] mr-2" />
            <span className="text-lg font-semibold text-gray-700">{event.time}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-[#D08860] mr-2" />
          <p className="text-lg text-gray-700 font-medium">{event.location}</p>
        </div>
        
        <div className={`${theme.accent} rounded-lg p-4 border-l-4 border-[#D08860]`}>
          <p className="text-amber-800 text-base leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsHeader;