import React, { useState } from 'react';
import Logo from '../assets/NITS.png';

function Dues() {
  const [status, setStatus] = useState('Pending'); // TODO: Fetch from API

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Upload to API and update status
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 font-sans" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FF6600)' }}>
      <img src={Logo} alt="NIT Silchar" className="h-16 mb-6" />
      <h1 className="text-3xl font-bold text-[#004080] mb-6">Dues Payment</h1>
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#004080] mb-4">Payment Instructions</h2>
        <p className="text-gray-700 mb-2">Pay your semester fees via SBI Collect:</p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Visit the SBI Collect portal</li>
          <li>Select NIT Silchar as the institution</li>
          <li>Enter your details and pay the required amount</li>
          <li>Download the payment receipt</li>
        </ul>
      </div>
      <form onSubmit={handleUpload} className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 space-y-4">
        <div>
          <label className="block text-[#004080] font-medium mb-2">Upload SBI Collect Receipt (PDF/JPG)</label>
          <input type="file" accept=".pdf,.jpg" className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#004080] focus:border-[#004080]" required />
        </div>
        <button type="submit" className="w-full bg-[#004080] text-white py-2 rounded-md hover:bg-[#003366] transition duration-200">Upload Receipt</button>
      </form>
      <div className="mt-6 text-center">
        <span className={`px-4 py-2 rounded-full text-white text-sm font-medium ${status === 'Pending' ? 'bg-yellow-500' : status === 'Under Review' ? 'bg-blue-500' : 'bg-green-500'}`}>Receipt Status: {status}</span>
      </div>
    </div>
  );
}

export default Dues;