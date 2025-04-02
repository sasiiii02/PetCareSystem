import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserRegisteredEventsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRegistrationId, setEditingRegistrationId] = useState(null);
  const [newTickets, setNewTickets] = useState("");

  const token = localStorage.getItem("token");

  // Axios instance with Authorization header
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Fetch user's registered events
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get("/registrations");
        setRegistrations(response.data.registrations);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching registrations");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRegistrations();
    } else {
      setError("Please log in to view your registrations.");
      setLoading(false);
    }
  }, [token]);

  // Handle update registration
  const handleUpdateRegistration = async (registrationId) => {
    if (!newTickets || newTickets < 1) {
      setError("Please enter a valid number of tickets.");
      return;
    }

    try {
      const response = await api.put(`/registrations/${registrationId}`, {
        tickets: parseInt(newTickets),
      });

      if (response.data.success) {
        setRegistrations(
          registrations.map((reg) =>
            reg._id === registrationId
              ? { ...reg, tickets: parseInt(newTickets) }
              : reg
          )
        );
        setEditingRegistrationId(null);
        setNewTickets("");
        setError(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error updating registration"
      );
      console.error("Update error:", err);
    }
  };

  // Handle cancel registration
  const handleCancelRegistration = async (registrationId) => {
    if (!window.confirm("Are you sure you want to cancel this registration?")) {
      return;
    }

    try {
      const response = await api.delete(`/registrations/${registrationId}`);
      if (response.data.success) {
        setRegistrations(
          registrations.filter((reg) => reg._id !== registrationId)
        );
        setError(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error canceling registration"
      );
      console.error("Cancel error:", err);
    }
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto mt-28 p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-28 p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-28 p-6">
      <h1 className="text-3xl font-bold mb-6">My Registered Events</h1>

      {registrations.length === 0 ? (
        <p className="text-gray-600">
          You haven’t registered for any events yet.{" "}
          <Link to="/events" className="text-amber-700 underline">
            Browse events
          </Link>
        </p>
      ) : (
        <div className="grid gap-6">
          {registrations.map((registration) => (
            <div
              key={registration._id}
              className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {registration.eventId.title}
                </h2>
                <p className="text-gray-600">
                  Date: {new Date(registration.eventId.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Location: {registration.eventId.location}
                </p>
                <p className="text-gray-600">
                  Tickets: {registration.tickets}
                </p>
              </div>

              <div className="flex space-x-4">
                {/* Update Button */}
                {editingRegistrationId === registration._id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={newTickets}
                      onChange={(e) => setNewTickets(e.target.value)}
                      className="w-20 p-2 border rounded"
                      placeholder="Tickets"
                    />
                    <button
                      onClick={() => handleUpdateRegistration(registration._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRegistrationId(null)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingRegistrationId(registration._id);
                      setNewTickets(registration.tickets);
                    }}
                    className="bg-amber-700 text-white px-3 py-1 rounded hover:bg-amber-800"
                  >
                    Update Tickets
                  </button>
                )}

                {/* Cancel Button */}
                <button
                  onClick={() => handleCancelRegistration(registration._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Cancel Registration
                </button>

                {/* View Details Link */}
                <Link
                  to={`/event/${registration.eventId._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UserRegisteredEventsPage;