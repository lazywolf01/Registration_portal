import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend as PieLegend } from 'recharts';

function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // TODO: Add any logout logic here, like clearing session
    navigate('/admin/login');
  };
  const [stats, setStats] = useState({
    totalRegistered: 0,
    pendingVerifications: 0,
    rejectedForms: 0,
    duesUploaded: 0,
  });
  const registrationData = [
    { month: 'Jan', registrations: 400 },
    { month: 'Feb', registrations: 300 },
    // Add more data
  ];
  const departmentData = [
    { name: 'CSE', value: 400 },
    { name: 'ECE', value: 300 },
    // Add more
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchStats = async () => {
      // Assuming tables: students, verifications, etc.
      const { count: totalRegistered, error: studentsError } = await supabase.from('students').select('*', { count: 'exact', head: true });
      const { count: pendingVerifications, error: pendingError } = await supabase.from('verifications').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: rejectedForms, error: rejectedError } = await supabase.from('forms').select('*', { count: 'exact', head: true }).eq('status', 'rejected');
      const { count: duesUploaded, error: duesError } = await supabase.from('dues').select('*', { count: 'exact', head: true });
      if (!studentsError && !pendingError && !rejectedError && !duesError) {
        setStats({
          totalRegistered: totalRegistered ?? 0,
          pendingVerifications: pendingVerifications ?? 0,
          rejectedForms: rejectedForms ?? 0,
          duesUploaded: duesUploaded ?? 0,
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-black text-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-[#003366]">Dashboard</Link>
          <Link to="/admin/students" className="block p-2 hover:bg-blue-100">Student List</Link>
          <Link to="/admin/dues" className="block p-2 hover:bg-blue-100">Dues Verifications</Link>
          <Link to="/admin/verify" className="block p-2 hover:bg-blue-100">Registration Verifications</Link>
          <Link to="/admin/notifications" className="block p-2 hover:bg-blue-100">Notifications</Link>
          <Link to="/admin/settings" className="block p-2 hover:bg-blue-100">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-800">
        <header className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Welcome, Admin Name | Role: Super Admin</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg shadow text-center text-white">
            <p className="text-3xl font-bold">{stats.totalRegistered}</p>
            <p>Total Students Registered</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow text-center text-white">
            <p className="text-3xl font-bold">{stats.pendingVerifications}</p>
            <p>Pending Verifications</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow text-center text-white">
            <p className="text-3xl font-bold">{stats.rejectedForms}</p>
            <p>Rejected Forms</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow text-center text-white">
            <p className="text-3xl font-bold">{stats.duesUploaded}</p>
            <p>Dues Receipts Uploaded</p>
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4 text-white">Registrations Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-white">Registrations by Department</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieLegend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow text-white">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-600">
                  <th className="p-2">Date</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Student</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Oct 1</td>
                  <td className="p-2">Form Approved</td>
                  <td className="p-2">John Doe</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;