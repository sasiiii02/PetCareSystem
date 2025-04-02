import React, { useState } from "react";

const RegisterEventModal = ({ event, user, onConfirm, onClose, error }) => {
  const [tickets, setTickets] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ tickets }); // Only send tickets to backend
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Register for {event.title}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field (Autofilled, Read-Only) */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Email Field (Autofilled, Read-Only) */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Tickets Field (Editable) */}
          <div className="mb-4">
            <label className="block text-gray-700">Number of Tickets</label>
            <input
              type="number"
              min="1"
              value={tickets}
              onChange={(e) => setTickets(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEventModal;