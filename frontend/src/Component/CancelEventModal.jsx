import { useState } from "react";

const CancelEventModal = ({ event, registration, onConfirm, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const eventDate = new Date(event.date);
  const today = new Date();
  const daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  const isRefundEligible =
    daysUntilEvent >= event.refundPolicy.minDays &&
    daysUntilEvent <= event.refundPolicy.maxDays;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await onConfirm();
    } catch (err) {
      setError(err.message || "Failed to cancel registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Cancel Registration for {event.title}
        </h2>

        <div className="mb-4">
          <p className="text-gray-700">
            Are you sure you want to cancel your registration for {registration.tickets} {registration.tickets === 1 ? "ticket" : "tickets"}?
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <span className="font-semibold">Refund Policy:</span>{" "}
            {isRefundEligible
              ? `${event.refundPolicy.percentage}% refund will be processed (cancellation within ${event.refundPolicy.minDays}–${event.refundPolicy.maxDays} days before the event).`
              : "No refund applicable (outside refund window)."}
          </p>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded text-white font-medium transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Cancelling..." : "Confirm Cancellation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelEventModal;