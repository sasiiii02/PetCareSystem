import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDetailsHeader from "../Component/EventDetailsHeader";
import RegisterEventModal from "../Component/RegisterEventModal";
import axios from "axios";

const UserEventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null); // New state for user profile
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  const token = localStorage.getItem("token");

  // Axios instance with default Authorization header
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Fetch event details, user profile, and registration status
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event details
        const eventResponse = await api.get(`/events/${id}`);
        setEvent(eventResponse.data.event);

        // Fetch user profile (only if logged in)
        if (token) {
          const userResponse = await api.get("/users/profile");
          setUser(userResponse.data); // { _id, name, email, ... }

          // Check if user is registered
          const regResponse = await api.get("/registrations");
          const userRegistrations = regResponse.data.registrations;
          const isUserRegistered = userRegistrations.some(
            (reg) => reg.eventId._id === id
          );
          setIsRegistered(isUserRegistered);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleRegisterClick = () => {
    if (!token) {
      setRegistrationError("Please log in to register for the event.");
      return;
    }
    setIsModalOpen(true);
    setRegistrationError(null);
    setRegistrationSuccess(null);
  };

  const handleConfirmRegistration = async (formData) => {
    try {
      const registrationData = {
        eventId: id,
        tickets: formData.tickets || 1,
      };

      const response = await api.post("/registrations/register", registrationData);

      if (response.data.success) {
        setIsRegistered(true);
        setRegistrationSuccess("Registration successful!");
        setIsModalOpen(false);
      } else {
        setRegistrationError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setRegistrationError(
        err.response?.data?.message ||
          "An error occurred during registration. Please try again."
      );
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto mt-28 p-6">Loading event details...</div>;
  }

  if (error) {
    return <div className="max-w-4xl mx-auto mt-28 p-6 text-red-500">Error: {error}</div>;
  }

  if (!event) {
    return <div className="max-w-4xl mx-auto mt-28 p-6">Event not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-28 p-6 bg-white shadow-md rounded-lg relative">
      <EventDetailsHeader event={event} />

      <div className="mt-6 flex flex-col items-center">
        {!isRegistered ? (
          <>
            <button
              onClick={handleRegisterClick}
              className="bg-amber-700 text-white px-6 py-2 text-lg rounded-lg hover:bg-amber-800 transition duration-200"
            >
              Register for Event
            </button>
            {registrationError && (
              <p className="text-red-500 mt-2">{registrationError}</p>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              ✅ You have successfully registered for this event!
            </p>
            {registrationSuccess && (
              <p className="text-green-600 mt-2">{registrationSuccess}</p>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <RegisterEventModal
          event={event}
          user={user} // Pass user data to modal
          onConfirm={handleConfirmRegistration}
          onClose={() => {
            setIsModalOpen(false);
            setRegistrationError(null);
          }}
          error={registrationError}
        />
      )}
    </div>
  );
};

export default UserEventDetailsPage;