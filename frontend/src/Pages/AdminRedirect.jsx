import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const AdminRedirect = () => {
  const { role } = useParams();

  useEffect(() => {
    console.log('AdminRedirect - Token:', localStorage.getItem('adminToken'));
    switch (role) {
      case "event_manager":
        window.location.href = "http://localhost:3001/";
        break;
      case "user_admin":
        window.location.href = "http://localhost:3002/";
        break;
      case "adoption_manager":
        window.location.href = "http://localhost:3003/";
        break;
      case "appointment_manager":
        window.location.href = "http://localhost:3004/";
        break;
      case "store_manager":
        window.location.href = "http://localhost:3005/";
        break;
      default:
        localStorage.removeItem("adminToken");
        window.location.href = "/admin-login";
    }
  }, [role]);

  return <div>Redirecting...</div>;
};

export default AdminRedirect;