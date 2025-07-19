import React, { useState, useEffect } from 'react';
import Logo from '../assets/NITS.png'; // Assuming the logo is in assets

interface StatusItem {
  label: string;
  status: 'completed' | 'in-progress' | 'pending';
}

function Status() {
  const [statusItems, setStatusItems] = useState<StatusItem[]>([
    { label: 'Dues Paid', status: 'completed' },
    { label: 'Form Submitted', status: 'completed' },
    { label: 'Documents Uploaded', status: 'in-progress' },
    { label: 'Admin Verification', status: 'pending' },
  ]); // TODO: Fetch from API

  const [mentorInfo, setMentorInfo] = useState({
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science',
    email: 'rajesh.kumar@nits.ac.in',
  }); // TODO: Fetch from API

  const [remarks, setRemarks] = useState('Please upload your signed registration form to proceed with verification.'); // TODO: Fetch from API

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="text-green-500 text-xl">✅</span>;
      case 'in-progress':
        return <span className="text-yellow-500 text-xl">⏳</span>;
      case 'pending':
        return <span className="text-gray-400 text-xl">⭕</span>;
      default:
        return null;
    }
  };

  const isRegistrationComplete = statusItems.every(item => item.status === 'completed');

  useEffect(() => {
    // TODO: Fetch status from Supabase
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6 font-sans">
      <img src={Logo} alt="NIT Silchar Logo" className="w-24 h-24 mb-6" />
      <h1 className="text-3xl font-bold text-[#004080] mb-2">Registration Status</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">Track your semester registration progress and verification status.</p>
      
      <div className="w-full max-w-2xl space-y-8">
        {/* Progress Checklist */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#004080] mb-4">Progress Checklist</h2>
          <ul className="space-y-4">
            {statusItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="mr-3">{getStatusIcon(item.status)}</div>
                <span className={`font-medium ${item.status === 'completed' ? 'text-green-700' : item.status === 'in-progress' ? 'text-yellow-700' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Mentor Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#004080] mb-4">Mentor Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {mentorInfo.name}</p>
            <p><span className="font-medium">Department:</span> {mentorInfo.department}</p>
            <p><span className="font-medium">Email:</span> <a href={`mailto:${mentorInfo.email}`} className="text-[#004080] hover:underline">{mentorInfo.email}</a></p>
          </div>
        </div>
        
        {/* Admin Remarks */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#004080] mb-4">Admin Remarks</h2>
          <p className="text-gray-700">{remarks}</p>
        </div>
        
        {/* Final Confirmation */}
        <div className={`rounded-xl shadow-md p-6 ${isRegistrationComplete ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <h2 className="text-xl font-semibold text-[#004080] mb-2">
            {isRegistrationComplete ? 'Registration Complete!' : 'Registration In Progress'}
          </h2>
          <p className="text-gray-700">
            {isRegistrationComplete 
              ? 'Your semester registration has been successfully verified. You can download your registration slip from the dashboard.' 
              : 'Please complete all pending items to finalize your semester registration.'}
          </p>
          {isRegistrationComplete && (
            <button className="mt-4 bg-[#004080] hover:bg-[#003060] text-white font-medium py-2 px-4 rounded-lg transition duration-300">
              Download Registration Slip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Status;