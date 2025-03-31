import React from "react";
import { useParams } from "react-router-dom";
import EventDetailsHeader from "../../components/EventDetailsHeader";

const UserEventDetailsPage = () => {
  const { id } = useParams();

  // Temporary event data (replace with API call in future)
  const event = {
    id,
    title: "Pet Adoption Fair",
    image: "/event-image.jpg",
    date: "April 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "City Pet Park, Downtown",
    description:
      "Join us for a fun-filled day where you can meet and adopt adorable pets! Enjoy pet-friendly activities, giveaways, and more!",
  };

  return (
    <div className="max-w-4xl mx-auto mt-28 p-6 bg-white shadow-md rounded-lg ">
      <EventDetailsHeader event={event} />

      {/* Register Button */}
      <div className="mt-6 flex justify-center ">
        <button className="bg-amber-700 text-white px-6 py-2 text-lg rounded-lg hover:bg-amber-800 transition duration-200">
          Register for Event
        </button>
      </div>
    </div>
  );
};

export default UserEventDetailsPage;
