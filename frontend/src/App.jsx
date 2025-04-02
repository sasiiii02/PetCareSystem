import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHeader from "./Component/UserHeader";
import UserFooter from "./Component/UserFooter";
import PetPlatformHomePage from "./Component/PetPlatformHomePage";
import UserEventsPage from "./Pages/UserEventsPage";
import UserEventDetailsPage from "./Pages/UserEventDetails";
import UserRegisteredEventsPage from "./Pages/UserRegisteredEventsPage";
import AboutUs from "./Component/AboutUs";
import ContactUs from "./Component/ContactUs";
import Login from "./Pages/Login"; // Your unchanged Login component
import AdminRedirect from "./Pages/AdminRedirect";
import PrivateRoute from "./Component/PrivateRoute";
import AdminLogin from "./Pages/AdminLogin";
import AdminPrivateRoute from "./Component/AdminPrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <UserHeader />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PetPlatformHomePage />} />
        <Route path="/login" element={<Login />} /> {/* Optional standalone Login */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* User Protected Routes */}
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <UserEventsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/event/:id"
          element={
            <PrivateRoute>
              <UserEventDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <UserRegisteredEventsPage />
            </PrivateRoute>
          }
        />

        {/* Admin Protected Route */}
        <Route
          path="/admin-redirect/:role"
          element={
            <AdminPrivateRoute>
              <AdminRedirect />
            </AdminPrivateRoute>
          }
        />
      </Routes>
      <UserFooter />
    </BrowserRouter>
  );
};

export default App;