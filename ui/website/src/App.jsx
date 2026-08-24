import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import DynamicWebpage from './pages/DynamicWebpage'
import ErrorBoundary from './components/ErrorBoundary'
import FindTechnician from './pages/FindTechnician'
import TechnicianProfile from './pages/TechnicianProfile'
import TechnicianRegister from './pages/TechnicianRegister'
import Auth from './pages/Auth'
import UserDashboard from './pages/UserDashboard'
import TechnicianDashboard from './pages/TechnicianDashboard'

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find-technician" element={<FindTechnician />} />
          <Route path="/technician-profile/:id" element={<TechnicianProfile />} />
          <Route path="/technician-register" element={<TechnicianRegister />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/customer-dashboard" element={<UserDashboard />} />
          <Route path="/technician-dashboard" element={<TechnicianDashboard />} />
          <Route path="/:slug" element={<DynamicWebpage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
