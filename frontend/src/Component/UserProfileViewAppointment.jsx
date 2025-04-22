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
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  PawPrint,
  ShoppingBag,
  Ticket,
  Edit,
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
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ProfilePage = () => {
  const [showAppointmentSection, setShowAppointmentSection] = useState(false);
  const [showAdoptionSection, setShowAdoptionSection] = useState(false);
  const [showProductSection, setShowProductSection] = useState(false);
  const [showEventSection, setShowEventSection] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Sri Lankan user data
  const user = {
    name: "Nimali Perera",
    email: "nimali.perera@gmail.com",
    phone: "+94 76 123 4567",
    address: "123 Flower Road, Colombo 07, Sri Lanka",
    membership: "Premium",
    memberSince: "2021-03-15",
    paymentMethod: "Visa •••• 4242",
    profilePic: "https://randomuser.me/api/portraits/women/42.jpg",
  };

  // Mock data for other sections
  const adoptions = [
    {
      id: "ADPT001",
      petName: "Kalu",
      petType: "Dog",
      breed: "Local Mixed Breed",
      date: "2023-05-20",
      status: "Completed",
      shelter: "Colombo Animal Shelter"
    },
    {
      id: "ADPT002",
      petName: "Sudu",
      petType: "Cat",
      breed: "Siamese Mix",
      date: "2023-08-15",
      status: "In Progress",
      shelter: "Kandy Pet Rescue"
    }
  ];

  const products = [
    {
      id: "PRD001",
      name: "Organic Dog Food (5kg)",
      price: "Rs. 3,500",
      date: "2023-10-12",
      status: "Delivered",
      seller: "PetCare Lanka"
    },
    {
      id: "PRD002",
      name: "Premium Cat Litter",
      price: "Rs. 2,800",
      date: "2023-11-05",
      status: "Shipped",
      seller: "Paws & Claws"
    }
  ];

  const events = [
    {
      id: "EVT001",
      name: "Pet Care Workshop",
      date: "2023-12-10",
      time: "2:00 PM",
      location: "Colombo Public Library",
      status: "Registered"
    },
    {
      id: "EVT002",
      name: "Annual Pet Show",
      date: "2024-01-20",
      time: "9:00 AM",
      location: "Viharamahadevi Park",
      status: "Confirmed"
    }
  ];

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
      fetchAppointments();
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
      fetchAppointments();
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
      fetchAppointments();
    } else {
      setAppointments([]);
      setSearchError('');
    }
  };

  const toggleAdoptionSection = () => {
    setShowAdoptionSection(!showAdoptionSection);
  };

  const toggleProductSection = () => {
    setShowProductSection(!showProductSection);
  };

  const toggleEventSection = () => {
    setShowEventSection(!showEventSection);
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
        {/* User Profile Section */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border-2 border-amber-200">
          <div className={`${theme.primary} p-4 flex items-center`}>
            <div className="relative">
              <img 
                src={user.profilePic} 
                alt="Profile" 
                className="w-16 h-16 rounded-full border-4 border-white mr-4 object-cover"
              />
              <button className="absolute bottom-0 right-4 bg-amber-100 rounded-full p-1 border-2 border-white">
                <Edit size={14} className="text-amber-800" />
              </button>
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>{user.name}</h2>
              <p className={`${theme.textPrimary} opacity-90`}>{user.membership} Member</p>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className={`${theme.accent} p-2 rounded-full mr-4`}>
                  <Mail className="text-amber-800" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Email Address</h3>
                  <p className="text-amber-700">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`${theme.accent} p-2 rounded-full mr-4`}>
                  <Phone className="text-amber-800" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Phone Number</h3>
                  <p className="text-amber-700">{user.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className={`${theme.accent} p-2 rounded-full mr-4`}>
                  <MapPin className="text-amber-800" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Address</h3>
                  <p className="text-amber-700">{user.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`${theme.accent} p-2 rounded-full mr-4`}>
                  <Calendar className="text-amber-800" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Member Since</h3>
                  <p className="text-amber-700">{formatDate(user.memberSince)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 flex justify-between">
            <button
              className={`${theme.primary} ${theme.textPrimary} px-6 py-2 rounded-lg hover:${theme.secondary} transition shadow-md flex items-center`}
            >
              <Edit className="mr-2" size={18} />
              Edit Profile
            </button>
            <button
              className="bg-white text-amber-800 px-6 py-2 rounded-lg hover:bg-amber-50 transition shadow-md border border-amber-200 flex items-center"
            >
              <CreditCard className="mr-2" size={18} />
              Payment Methods
            </button>
          </div>
        </div>

        {/* Activity Sections */}
        <div className="space-y-6">
          {/* Appointments Section (Original Unchanged) */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border-2 border-amber-200">
            <div className="p-6">
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

          {/* Adoptions Section */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border-2 border-amber-200">
            <div className="p-6">
              <div className="flex justify-center mb-8">
                <button
                  onClick={toggleAdoptionSection}
                  className={`${theme.primary} ${theme.textPrimary} px-6 py-3 rounded-lg hover:${theme.secondary} transition flex items-center shadow-md`}
                >
                  <PawPrint className="mr-2" size={20} />
                  {showAdoptionSection ? 'Hide Adoptions' : 'View My Adoptions'}
                  {showAdoptionSection ? (
                    <ChevronUp className="ml-2" size={20} />
                  ) : (
                    <ChevronDown className="ml-2" size={20} />
                  )}
                </button>
              </div>

              {showAdoptionSection && (
                <div className={`${theme.accent} rounded-lg p-6 mb-6 transition-all duration-300 shadow-inner ${theme.border} border`}>
                  <h2 className={`text-2xl font-bold ${theme.textSecondary} mb-6 flex items-center justify-center`}>
                    <PawPrint className="mr-3" size={24} />
                    Your Adoption History
                  </h2>

                  {adoptions.length > 0 ? (
                    <div className="space-y-4">
                      {adoptions.map((adoption) => (
                        <div key={adoption.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-amber-100">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg text-amber-800">
                                {adoption.petName} - {adoption.breed}
                              </h3>
                              <p className="text-amber-700">Adoption ID: {adoption.id}</p>
                              <p className="text-amber-700">From: {adoption.shelter}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              adoption.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-200 text-amber-800'
                            }`}>
                              {adoption.status}
                            </span>
                          </div>
                          <div className="mt-4 flex items-center">
                            <Calendar className="mr-2 text-amber-600" size={18} />
                            <span className="text-amber-700">
                              Adopted on {formatDate(adoption.date)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-amber-700 bg-white rounded-lg shadow-inner border border-amber-100">
                      No adoption records found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border-2 border-amber-200">
            <div className="p-6">
              <div className="flex justify-center mb-8">
                <button
                  onClick={toggleProductSection}
                  className={`${theme.primary} ${theme.textPrimary} px-6 py-3 rounded-lg hover:${theme.secondary} transition flex items-center shadow-md`}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  {showProductSection ? 'Hide Products' : 'View Purchased Products'}
                  {showProductSection ? (
                    <ChevronUp className="ml-2" size={20} />
                  ) : (
                    <ChevronDown className="ml-2" size={20} />
                  )}
                </button>
              </div>

              {showProductSection && (
                <div className={`${theme.accent} rounded-lg p-6 mb-6 transition-all duration-300 shadow-inner ${theme.border} border`}>
                  <h2 className={`text-2xl font-bold ${theme.textSecondary} mb-6 flex items-center justify-center`}>
                    <ShoppingBag className="mr-3" size={24} />
                    Your Purchased Products
                  </h2>

                  {products.length > 0 ? (
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-amber-100">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg text-amber-800">
                                {product.name}
                              </h3>
                              <p className="text-amber-700">Order ID: {product.id}</p>
                              <p className="text-amber-700">Seller: {product.seller}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              product.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-200 text-amber-800'
                            }`}>
                              {product.status}
                            </span>
                          </div>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <Calendar className="mr-2 text-amber-600" size={18} />
                              <span className="text-amber-700">
                                Purchased on {formatDate(product.date)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="mr-2 text-amber-600" size={18} />
                              <span className="text-amber-700">Price: {product.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-amber-700 bg-white rounded-lg shadow-inner border border-amber-100">
                      No product purchases found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Events Section */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border-2 border-amber-200">
            <div className="p-6">
              <div className="flex justify-center mb-8">
                <button
                  onClick={toggleEventSection}
                  className={`${theme.primary} ${theme.textPrimary} px-6 py-3 rounded-lg hover:${theme.secondary} transition flex items-center shadow-md`}
                >
                  <Ticket className="mr-2" size={20} />
                  {showEventSection ? 'Hide Events' : 'View Registered Events'}
                  {showEventSection ? (
                    <ChevronUp className="ml-2" size={20} />
                  ) : (
                    <ChevronDown className="ml-2" size={20} />
                  )}
                </button>
              </div>

              {showEventSection && (
                <div className={`${theme.accent} rounded-lg p-6 mb-6 transition-all duration-300 shadow-inner ${theme.border} border`}>
                  <h2 className={`text-2xl font-bold ${theme.textSecondary} mb-6 flex items-center justify-center`}>
                    <Ticket className="mr-3" size={24} />
                    Your Registered Events
                  </h2>

                  {events.length > 0 ? (
                    <div className="space-y-4">
                      {events.map((event) => (
                        <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-amber-100">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg text-amber-800">
                                {event.name}
                              </h3>
                              <p className="text-amber-700">Location: {event.location}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              event.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-200 text-amber-800'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <Calendar className="mr-2 text-amber-600" size={18} />
                              <span className="text-amber-700">
                                {formatDate(event.date)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 text-amber-600" size={18} />
                              <span className="text-amber-700">Time: {event.time}</span>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-amber-200">
                            <button className={`${theme.primary} ${theme.textPrimary} px-4 py-2 rounded-lg hover:${theme.secondary} transition shadow-sm`}>
                              View Event Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-amber-700 bg-white rounded-lg shadow-inner border border-amber-100">
                      No event registrations found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;