import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import Header from './components/Header'
import UserHeader1 from './Component/UserHeader'
import AdoptablePetList from './Pages/AdoptablePetList'
import PetAdoptionForm from './Pages/AdoptionForm'
import UserPageView from './Pages/UserPageView'
import UserHeader from './Component/UserHeader'
import PetPlatformHomePage from './Component/Home'
import ContactUs from './Pages/ContactUs'
import Footer from './Component/Footer'
import Grid from './Component/BentoGrid'
import PetAdoptionDashboard from './Pages/AdminDashBoard'
import AboutUs from './Pages/AboutUs'
import PetOwnerForm from './Pages/AddForAdoption'
import PetAdoptionSummary from './Pages/PetAdoptionSummary'


export default function App() {
  return (
    <Router>
      <UserHeader1/>
      <div>
        <Routes>
    
        <Route path='/' element={<PetPlatformHomePage />} />
          <Route path='/adoption' element={<UserPageView />} />
          <Route path='/info_adoptable_pet' element={<AdoptablePetList />} />
          <Route path='/add_adoptable_pet' element={<PetOwnerForm />} />
          <Route path='/info_select_pet' element={<UserPageView />} />
          <Route path='/adopt' element={<PetAdoptionForm />} />
          <Route path='/Submit_adoption_Form' element={<UserPageView />} />
          <Route path='/ee' element={<PetAdoptionDashboard />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='formdata' element={<PetAdoptionSummary />} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}