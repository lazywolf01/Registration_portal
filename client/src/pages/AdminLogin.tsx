import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login failed: ' + error.message);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <div className="mb-4">
          <label className="block mb-2">Admin Email</label>
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;