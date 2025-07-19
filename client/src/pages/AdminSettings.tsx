import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface Admin {
  id: string;
  email: string;
  role: string;
}

function AdminSettings() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Dept. Verifier');
  const [deadline, setDeadline] = useState('');
  const [uploadRules, setUploadRules] = useState('');
  const [otpToggle, setOtpToggle] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: adminData, error: adminError } = await supabase.from('admins').select('*');
      if (!adminError) setAdmins(adminData);
      // Assuming a settings table
      const { data: settingsData, error: settingsError } = await supabase.from('settings').select('*').single();
      if (!settingsError) {
        setDeadline(settingsData.deadline || '');
        setUploadRules(settingsData.upload_rules || '');
        setOtpToggle(settingsData.otp_toggle || true);
      }
    };
    fetchData();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from('admins').insert({ email: newAdminEmail, role: newAdminRole });
    if (!error) {
      setAdmins([...admins, { id: '', email: newAdminEmail, role: newAdminRole }]);
    }
    setNewAdminEmail('');
    setNewAdminRole('Dept. Verifier');
  };

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from('settings').upsert({ deadline, upload_rules: uploadRules, otp_toggle: otpToggle });
    if (!error) {
      alert('Settings saved successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="font-bold mb-2">Manage Admins</h2>
        <form onSubmit={handleAddAdmin} className="flex space-x-4 mb-4">
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAdminEmail(e.target.value)}
            placeholder="Admin Email"
            className="flex-1 p-2 border rounded"
            required
          />
          <select
            value={newAdminRole}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewAdminRole(e.target.value)}
            className="p-2 border rounded"
          >
            <option>Super Admin</option>
            <option>Dept. Verifier</option>
          </select>
          <button type="submit" className="bg-[#004080] text-white px-4 py-2 rounded">Add</button>
        </form>
        <table className="w- full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">System Settings</h2>
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <label>Registration Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Upload Format Rules</label>
            <textarea
              value={uploadRules}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUploadRules(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label>OTP Service Toggle</label>
            <input
              type="checkbox"
              checked={otpToggle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtpToggle(e.target.checked)}
              className="ml-2"
            />
          </div>
          <button type="submit" className="bg-[#004080] text-white px-4 py-2 rounded">Save Settings</button>
        </form>
      </div>
    </div>
  );
}

export default AdminSettings;