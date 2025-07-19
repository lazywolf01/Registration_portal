import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/NITS.png';

function OTP() {
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      if (response.ok) {
        navigate('/dashboard');
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white" style={{ background: 'linear-gradient(to bottom right, #004080, #FF6600)' }}>
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <img src={Logo} alt="NIT Silchar" className="mx-auto h-24 w-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#004080] font-sans">Verify OTP</h2>
          <p className="mt-2 text-sm text-gray-600 font-sans">Enter the 6-digit code sent to {email}</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="otp" className="sr-only">OTP</label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength={6}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#004080] hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004080] font-sans"
            >
              Verify OTP
            </button>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Max 3 attempts allowed. Resend available in background.
          </p>
        </form>
      </div>
    </div>
  );
}

export default OTP;