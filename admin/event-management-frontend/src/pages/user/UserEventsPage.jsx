import UserEventCard from "../../components/user/UserEventCard";

const UserEventsPage = () => {
  // Sample event data (replace this with API data later)
  const dummyEvents = [
    {
      id: 1,
      title: "Dog Adoption Drive",
      date: "April 10, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Central Park, NY",
      image: "/event1.jpg",
    },
    {
      id: 2,
      title: "Pet Training Workshop",
      date: "April 15, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Downtown Hall, NY",
      image: "/event2.jpg",
    },
    {
      id: 3,
      title: "Charity Pet Run",
      date: "April 20, 2025",
      time: "8:00 AM - 11:00 AM",
      location: "Greenwood Park, LA",
      image: "/event3.jpg",
    },
  ];

  return (
    <div className="p-6 pt-28">
      <h2 className="text-2xl font-bold text-amber-950 mb-6">Upcoming Pet Events</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {dummyEvents.map((event) => (
          <UserEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UserEventsPage;/*
import { useEffect, useState } from "react";
import UserEventCard from "../../components/user/UserEventCard"; // Import the new card

export default function UserEventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events") // Replace with actual API
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="bg-[#F5EFEA] container  mx-auto px-25 py-8 mt-28">
      <h1 className="text-3xl font-bold text-amber-950 mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => <UserEventCard key={event._id} event={event} />)
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
}*/
