import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import VerifyOtp from './components/auth/VerifyOtp.jsx'
import CompleteProfile from './components/auth/CompleteProfile.jsx'
import Home from './components/Home.jsx'
import Navbar from './components/layouts/Navbar.jsx'
import Error from './components/layouts/Error.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
