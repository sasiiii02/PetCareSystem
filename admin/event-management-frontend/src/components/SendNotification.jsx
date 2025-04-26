import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

const SendNotification = ({ attendees, eventId }) => {
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch sent notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notifications/event/${eventId}`);
        if (response.data.success) {
          setNotifications(
            response.data.notifications.map((notif) => ({
              id: notif._id,
              message: notif.content,
              eventId: notif.eventId,
              time: new Date(notif.createdAt).toLocaleString(),
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, [eventId]);

  const handleSendNotification = async () => {
    if (!message.trim()) {
      setErrorMessage("Notification message cannot be empty.");
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    if (message.length > 500) {
      setErrorMessage("Notification message cannot exceed 500 characters.");
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await api.post(`/notifications/event/${eventId}/send`, { content: message });
      if (response.data.success) {
        const newNotification = {
          id: Date.now(), // Temporary ID until we refresh
          message,
          eventId,
          time: new Date().toLocaleString(),
        };
        setNotifications([newNotification, ...notifications]);
        setSuccessMessage(response.data.message);
        setMessage("");
        // Refresh notifications from backend
        const updatedResponse = await api.get(`/notifications/event/${eventId}`);
        if (updatedResponse.data.success) {
          setNotifications(
            updatedResponse.data.notifications.map((notif) => ({
              id: notif._id,
              message: notif.content,
              eventId: notif.eventId,
              time: new Date(notif.createdAt).toLocaleString(),
            }))
          );
        }
      } else {
        setErrorMessage("Failed to send notification.");
      }
    } catch (err) {
      console.error("Error sending notification:", err);
      setErrorMessage(err.response?.data?.message || "Error sending notification.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-2xl font-bold text-amber-950 mb-6">Send Notifications</h3>

      <div className="relative mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D08860] focus:border-transparent transition-all resize-none"
          placeholder="Write your message to the attendees..."
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {message.length}/500
        </div>
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">{errorMessage}</div>
      )}

      <div className="flex justify-end space-x-4 items-center">
        <span className="text-sm text-gray-500">
          {message.trim().length > 0 ? "Ready to send" : "Compose a message"}
        </span>
        <button
          onClick={handleSendNotification}
          disabled={loading || !message.trim()}
          className="bg-[#D08860] text-white px-6 py-2 rounded-lg hover:bg-[#B7704E] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              Sending...
            </div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span>Send Notification</span>
            </>
          )}
        </button>
      </div>

      {notifications.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-amber-950 mb-4">Sent Notifications</h4>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-gray-50 p-3 rounded-lg border-l-4 border-[#D08860]"
              >
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SendNotification;