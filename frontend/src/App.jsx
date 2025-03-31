import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHeader from './Component/UserHeader';
import UserEventDetailsPage from './Pages/UserEventDetails';
import UserEventsPage from './Pages/UserEventsPage';
import UserFooter from './Component/UserFooter';
import PetPlatformHomePage from './Component/PetPlatformHomePage';
import AboutUs from './Component/AboutUs';
import ContactUs from './Component/ContactUs';
const App = () => {
  return (
    <div> 
    <BrowserRouter>
    <UserHeader />

     <Routes>
     <Route path="/" element={<PetPlatformHomePage />} />
      <Route path="/events" element={<UserEventsPage />} />
      <Route path="/event/:id" element={<UserEventDetailsPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />




    </Routes>
   <UserFooter/>
  </BrowserRouter></div>
  )
}

export default App