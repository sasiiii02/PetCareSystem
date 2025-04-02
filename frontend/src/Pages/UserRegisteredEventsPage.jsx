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
    return (
      <div className="max-w-6xl mx-auto mt-28 p-6 flex justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-amber-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-amber-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-amber-200 rounded"></div>
              <div className="h-4 bg-amber-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-28 p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-md">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to="/events" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            Browse Available Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-28 p-6">
      <div className="flex justify-between items-center mb-8 border-b border-amber-200 pb-4">
        <h1 className="text-3xl font-bold text-amber-900">My Registered Events</h1>
        <Link 
          to="/events" 
          className="flex items-center px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg transition-all border border-amber-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Browse More Events
        </Link>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-amber-50 rounded-lg p-8 text-center shadow-sm border border-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-700 text-lg mb-6">You haven't registered for any events yet.</p>
          <Link to="/events" className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            Discover Events
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {registrations.map((registration) => (
            <div
              key={registration._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 bg-amber-700 flex items-center justify-center w-full md:w-24 h-24 md:h-auto">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">
                      {new Date(registration.eventId.date).getDate()}
                    </div>
                    <div className="text-sm">
                      {new Date(registration.eventId.date).toLocaleString('default', { month: 'short' })}
                    </div>
                  </div>
                </div>
                <div className="p-6 md:flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {registration.eventId.title}
                  </h2>
                  <div className="flex flex-wrap text-sm text-gray-600 mb-4">
                    <div className="flex items-center mr-4 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {registration.eventId.location}
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      {registration.tickets} {registration.tickets === 1 ? 'Ticket' : 'Tickets'}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Update Button */}
                    {editingRegistrationId === registration._id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="1"
                          value={newTickets}
                          onChange={(e) => setNewTickets(e.target.value)}
                          className="w-20 p-2 border rounded focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Tickets"
                        />
                        <button
                          onClick={() => handleUpdateRegistration(registration._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingRegistrationId(null)}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition-colors"
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
                        className="flex items-center text-amber-700 border border-amber-200 hover:bg-amber-50 px-3 py-1 rounded transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Update Tickets
                      </button>
                    )}

                    {/* Cancel Button */}
                    <button
                      onClick={() => handleCancelRegistration(registration._id)}
                      className="flex items-center text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1 rounded transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Cancel Registration
                    </button>

                    {/* View Details Link */}
                    <Link
                      to={`/event/${registration.eventId._id}`}
                      className="flex items-center bg-amber-700 text-white px-3 py-1 rounded hover:bg-amber-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegisteredEventsPage;