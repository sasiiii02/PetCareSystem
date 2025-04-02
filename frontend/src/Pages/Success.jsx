import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const appointmentId = searchParams.get("appointment_id");

    console.log("Success Page - Session ID:", sessionId);
    console.log("Success Page - Appointment ID:", appointmentId);
    console.log("Success Page - Token:", localStorage.getItem("token"));

    if (sessionId && appointmentId) {
      const confirmPayment = async (retries = 3, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
          try {
            console.log(`Attempt ${i + 1} - Requesting confirmation with params:`, {
              sessionId,
              appointmentId
            });
            
            const response = await api.get(`/appointments/confirm`, {
              params: {
                sessionId,
                appointmentId
              }
            });

            console.log("Confirmation Response:", response.data);
            if (response.data.success) {
              alert("Appointment Booked and Paid Successfully!");
              navigate("/home");
              return;
            }
          } catch (error) {
            console.error(`Attempt ${i + 1} - Error:`, {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message
            });
            
            if (i === retries - 1) {
              alert("Payment confirmation failed. Please check your appointments or contact support.");
              navigate("/appointments");
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      };
      confirmPayment();
    } else {
      alert("Missing payment information. Please contact support.");
      navigate("/appointments");
    }
  }, [searchParams, navigate]);

  return (
    <div className="max-w-6xl mx-auto p-8 pt-24 text-center">
      <h1 className="text-3xl font-bold text-[#D08860]">Processing Payment...</h1>
      <p className="mt-4 text-lg">Please wait while we confirm your payment.</p>
      <div className="mt-8 animate-pulse">
        <div className="w-16 h-16 border-4 border-[#D08860] border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default Success;