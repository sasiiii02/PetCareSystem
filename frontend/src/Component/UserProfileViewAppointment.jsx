import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  List,
  X,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  FileText,
} from 'lucide-react';
import axios from 'axios';

// Theme configuration
const theme = {
  primary: "bg-[#D08860]",
  secondary: "bg-[#B3714E]",
  textPrimary: "text-white",
  textSecondary: "text-amber-950",
  accent: "bg-amber-100",
  border: "border-amber-200",
};

// Axios instance with token interceptor
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Token stored after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ProfilePage = () => {
  const [showAppointmentSection, setShowAppointmentSection] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchAppointments = async () => {
    setIsLoading(true);
    setSearchError('');

    try {
      const response = await api.get('/appointments/active');
      const { appointments: fetchedAppointments } = response.data;
      setAppointments(fetchedAppointments || []);
    } catch (error) {
      if (error.response?.status === 401) {
        setSearchError('Please log in to view appointments');
      } else if (error.response?.status === 404) {
        setSearchError('No active appointments found');
        setAppointments([]);
      } else {
        setSearchError(error.response?.data?.message || 'Failed to fetch appointments');
      }
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelWithRefund = async (appointmentId) => {
    const reason = window.prompt('Please enter reason for cancellation and refund request (min 10 characters):');
    if (!reason || reason.trim().length < 10) {
      alert('Refund reason is required and must be at least 10 characters');
      return;
    }

    if (!window.confirm('Are you sure you want to cancel this appointment and request a refund?')) {
      return;
    }

    setIsCancelling(true);

    try {
      const response = await api.patch(`/appointments/${appointmentId}/cancel-with-refund`, {
        refundReason: reason,
      });

      const { data } = response.data;
      alert(`Success! Your refund request for $${data.refundRequest.netAmount.toFixed(2)} has been submitted.`);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'Failed to process cancellation'}`);
      console.error('Cancellation error:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleCancelWithoutRefund = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment without a refund?')) {
      return;
    }

    setIsCancelling(true);

    try {
      const response = await api.patch(`/appointments/${appointmentId}/cancel`);
      alert('Appointment cancelled successfully');
      fetchAppointments(); // Refresh the list
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'Failed to cancel appointment'}`);
      console.error('Cancellation error:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  const toggleAppointmentSection = () => {
    setShowAppointmentSection(!showAppointmentSection);
    if (!showAppointmentSection) {
      fetchAppointments(); // Automatically fetch when opening
    } else {
      setAppointments([]);
      setSearchError('');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className={`min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8 mt-30`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border-2 border-amber-200">
          <div className={`p-6`}>
            {/* View Appointments Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={toggleAppointmentSection}
                className={`${theme.primary} ${theme.textPrimary} px-6 py-3 rounded-lg hover:${theme.secondary} transition flex items-center shadow-md`}
              >
                <List className="mr-2" size={20} />
                {showAppointmentSection ? 'Hide Appointments' : 'View Active Appointments'}
                {showAppointmentSection ? (
                  <ChevronUp className="ml-2" size={20} />
                ) : (
                  <ChevronDown className="ml-2" size={20} />
                )}
              </button>
            </div>

            {/* Appointments Section */}
            {showAppointmentSection && (
              <div className={`${theme.accent} rounded-lg p-6 mb-6 transition-all duration-300 shadow-inner ${theme.border} border`}>
                <h2 className={`text-2xl font-bold ${theme.textSecondary} mb-6 flex items-center justify-center`}>
                  <Clock className="mr-3" size={24} />
                  Your Active Appointments
                </h2>

                {searchError && (
                  <div className="text-red-500 mb-6 text-center font-medium">{searchError}</div>
                )}

                {isLoading ? (
                  <div className="text-center py-8 text-amber-800">Loading appointments...</div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment._id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-amber-100"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-amber-800">
                              {appointment.appointmentType} Appointment
                            </h3>
                            <p className="text-amber-700">ID: {appointment._id.slice(-6)}</p>
                            <p className="text-amber-700">With Professional ID: {appointment.doctorId}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              appointment.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : appointment.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-200 text-amber-800'
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Calendar className="mr-2 text-amber-600" size={18} />
                            <span className="text-amber-700">
                              {formatDate(appointment.appointmentDate)} at{' '}
                              {formatTime(appointment.appointmentTime)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="mr-2 text-amber-600" size={18} />
                            <span className="text-amber-700">Fee: ${appointment.appointmentFee}</span>
                          </div>
                        </div>

                        {appointment.status === 'scheduled' && (
                          <div className="mt-5 pt-4 border-t border-amber-200">
                            <h4 className="font-medium mb-3 text-amber-800">Manage Appointment</h4>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() => handleCancelWithRefund(appointment._id)}
                                disabled={isCancelling}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center justify-center disabled:bg-gray-300 shadow-sm"
                              >
                                <X className="mr-2" size={18} />
                                {isCancelling ? 'Processing...' : 'Cancel & Request Refund'}
                              </button>
                              <button
                                onClick={() => handleCancelWithoutRefund(appointment._id)}
                                disabled={isCancelling}
                                className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition flex items-center justify-center disabled:bg-gray-300 shadow-sm"
                              >
                                <X className="mr-2" size={18} />
                                {isCancelling ? 'Processing...' : 'Cancel Without Refund'}
                              </button>
                              <button
                                onClick={() => alert('Reschedule functionality would go here')}
                                className={`px-4 py-2 ${theme.primary} ${theme.textPrimary} rounded-lg hover:${theme.secondary} transition flex items-center justify-center shadow-sm`}
                              >
                                <CalendarClock className="mr-2" size={18} />
                                Reschedule
                              </button>
                            </div>
                            <p className="text-sm text-amber-700 mt-3 italic">
                              Note: Refunds may take 5-7 business days to process.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-amber-700 bg-white rounded-lg shadow-inner border border-amber-100">
                    No active appointments found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;