import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvents';
import EventDetails from './pages/EventDetails';
import EditEvent from './pages/EditEvent';
import Notification from './pages/Notification';
import AdminPrivateRoute from './components/AdminPrivateRoute'; // Import AdminPrivateRoute
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route
          path="/create-event"
          element={
            <AdminPrivateRoute>
              <CreateEvent />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <AdminPrivateRoute>
              <MyEvents />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/event/:id"
          element={
            <AdminPrivateRoute>
              <EventDetails />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/edit-event/:id"
          element={
            <AdminPrivateRoute>
              <EditEvent />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <AdminPrivateRoute>
              <Notification />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;