import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import OTP from './pages/OTP';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import Dues from './pages/Dues';
import MyDocuments from './pages/MyDocuments';
import Notifications from './pages/Notifications';
import Status from './pages/Status';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import StudentList from './pages/StudentList';
import StudentProfile from './pages/StudentProfile';
import AdminDues from './pages/AdminDues';
import AdminVerify from './pages/AdminVerify';
import AdminNotifications from './pages/AdminNotifications';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<OTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/dues" element={<Dues />} />
        <Route path="/documents" element={<MyDocuments />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/status" element={<Status />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentList />} />
        <Route path="/admin/students/:id" element={<StudentProfile />} />
        <Route path="/admin/dues" element={<AdminDues />} />
        <Route path="/admin/verify" element={<AdminVerify />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
