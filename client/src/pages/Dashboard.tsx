import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/NITS.png';

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // TODO: Add any logout logic here, like clearing local storage or calling API
    navigate('/login');
  };
  const [duesPending, setDuesPending] = useState(true); // TODO: Fetch from API
const [showPopup, setShowPopup] = useState(duesPending);
  const [formSubmitted, setFormSubmitted] = useState(true); // TODO: Fetch from API
  const [docsVerified, setDocsVerified] = useState(true); // TODO: Fetch from API
  const [progress, setProgress] = useState([
    { name: 'Fee Paid', completed: true },
    { name: 'Form Submitted', completed: true },
    { name: 'Docs Uploaded', completed: false },
    { name: 'Admin Verified', completed: false },
  ]); // TODO: Fetch from API

  useEffect(() => {
    // TODO: Fetch data
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-[#004080] text-white shadow-md">
        <div className="p-4 flex items-center">
          <img src={Logo} alt="NIT Silchar" className="h-8 mr-2" />
          <h2 className="text-xl font-bold">NIT Silchar</h2>
        </div>
        <nav className="mt-6">
          <Link to="/dashboard" className="block py-2 px-4 hover:bg-[#003366]">Dashboard</Link>
          <Link to="/form" className="block py-2 px-4 hover:bg-[#003366]">Registration Form</Link>
          <Link to="/dues" className="block py-2 px-4 hover:bg-[#003366]">Dues Payment</Link>
          <Link to="/documents" className="block py-2 px-4 hover:bg-[#003366]">My Documents</Link>
          <Link to="/notifications" className="block py-2 px-4 hover:bg-[#003366]">Notifications</Link>
          <Link to="/status" className="block py-2 px-4 hover:bg-[#003366]">Registration Status</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#004080]">Namaste Mitra,</h1>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-[#004080] font-bold">KS</span>
          </div>
          <button onClick={handleLogout} className="ml-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </header>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 text-2xl mr-2">☀</span>
              <h3 className="font-bold">Fee Status</h3>
            </div>
            <p className="text-green-500 font-bold">Dues Cleared</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Upload Receipt</button>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-2">
              <span className="text-green-500 text-2xl mr-2">✓</span>
              <h3 className="font-bold">Registration Form</h3>
            </div>
            <p className="text-green-500 font-bold">Submitted</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">View/Edit Form</button>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 text-2xl mr-2">☀</span>
              <h3 className="font-bold">Documents</h3>
            </div>
            <p className="text-green-500 font-bold">Verified</p>
          </div>
        </div>

        {/* Welcome and Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-2">Welcome to Semester Registration Portal</h3>
            
            <div className="bg-gray-200 h-80 flex items-center justify-center rounded">
              <video loop autoPlay muted className="w-full h-full object-cover">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-2">Progress</h3>
            <ul>
              {progress.map((item, index) => (
                <li key={index} className="flex items-center mb-2">
                  <span className={`mr-2 ${item.completed ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        

        

        {/* Integrate existing elements like popup, alert, progress */}
        {duesPending && (
          <div className="p-4 bg-yellow-100 text-yellow-800 text-center sticky top-0 z-10">
            Dues not cleared. Please upload receipt to proceed.
          </div>
        )}
        {showPopup && duesPending && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-xl">⚠ You have pending dues.</p>
              <p>Please clear them to proceed with registration.</p>
              <button onClick={() => setShowPopup(false)} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;