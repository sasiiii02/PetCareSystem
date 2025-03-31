import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDetailsHeader from "../Component/EventDetailsHeader";
import RegisterEventModal from "../Component/RegisterEventModal";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const UserEventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  // Fetch event details from backend
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data.event);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
    setRegistrationError(null);
    setRegistrationSuccess(null);
  };

  const handleConfirmRegistration = async (formData) => {
    try {
      const registrationData = {
        eventId: id, // MongoDB event ID from URL params
        name: formData.name,
        email: formData.email,
        tickets: formData.tickets || 1, // Default to 1 ticket if not specified
        userId: uuidv4() // Generate a unique user ID for the registration
      };

      const response = await axios.post(
        "http://localhost:5000/api/registrations/register",
        registrationData
      );

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