import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/NITS.png';

function Login() {
  const navigate = useNavigate();
  const [scholarId, setScholarId] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scholarId, email }),
      });
      if (response.ok) {
        navigate('/verify-otp', { state: { email } });
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white" style={{ background: 'linear-gradient(to bottom right, #004080, #FF6600)' }}>
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <img src={Logo} alt="NIT Silchar" className="mx-auto h-24 w-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#004080] font-sans">NIT Silchar Semester Registration</h2>
          <p className="mt-2 text-sm text-gray-600 font-sans">Enter your Scholar ID and Email to receive OTP</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="scholar-id" className="sr-only">Scholar ID</label>
              <input
                id="scholar-id"
                name="scholarId"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Scholar ID"
                value={scholarId}
                onChange={(e) => setScholarId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Institute Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Institute Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#004080] hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004080] font-sans"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;