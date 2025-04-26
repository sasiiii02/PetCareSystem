import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHeader from "./Component/UserHeader";
import UserFooter from "./Component/UserFooter";
import PetPlatformHomePage from "./Component/PetPlatformHomePage";
import UserEventsPage from "./Pages/UserEventsPage";
import UserEventDetailsPage from "./Pages/UserEventDetails";
import UserRegisteredEventsPage from "./Pages/UserRegisteredEventsPage";
import AboutUs from "./Component/AboutUs";
import ContactUs from "./Component/ContactUs";
import Login from "./Pages/Login";
import PrivateRoute from "./Component/PrivateRoute";
import AdminLogin from "./Pages/AdminLogin";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";
import AppointmentPrfList from "./Pages/AppointmentPrfList";
import AppointmentForm from "./Component/AppointmentForm";
import ProfilePage from "./Component/UserProfileViewAppointment";
import Notifications from "./Pages/Notifications";
const App = () => {
  return (
    <BrowserRouter>
      <UserHeader />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PetPlatformHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/events" element={<UserEventsPage />} />
        <Route path="/appointment" element={<AppointmentPrfList />} />



        {/* User Protected Routes */}
     
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
          <Route
    path="/notifications"
    element={
      <PrivateRoute>
        <Notifications />
      </PrivateRoute>
    }
  />
       
        <Route
          path="/appointment-form"
          element={
            <PrivateRoute>
              <AppointmentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/success"
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        />
        <Route
          path="/cancel"
          element={
            <PrivateRoute>
              <Cancel />
            </PrivateRoute>
          }
        />
      </Routes>
      <UserFooter />
    </BrowserRouter>
  );
};

export default App;