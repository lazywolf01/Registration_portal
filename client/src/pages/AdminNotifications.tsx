import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface Notification {
  id: string;
  title: string;
  date: string;
  sentTo: string;
  status: string;
  body: string;
}

function AdminNotifications() {
  const [pastNotifications, setPastNotifications] = useState<Notification[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [target, setTarget] = useState('All');

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('date', { ascending: false });

      if (error) console.error('Error fetching notifications:', error);
      else setPastNotifications(data || []);
    };

    fetchNotifications();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: insertData, error: insertError } = await supabase
      .from('notifications')
      .insert([{ title, body, sentTo: target, date: new Date().toISOString(), status: 'sent' }])
      .select();
  
    if (insertError) {
      console.error('Error creating notification:', insertError);
      alert('Failed to create notification: ' + insertError.message);
      return;
    }
  
    setTitle('');
    setBody('');
    setTarget('All');
  
    // Refresh list
    const { data: refreshData, error: refreshError } = await supabase
      .from('notifications')
      .select('*')
      .order('date', { ascending: false });
  
    if (refreshError) {
      console.error('Error refreshing notifications:', refreshError);
      alert('Failed to refresh notifications: ' + refreshError.message);
    } else {
      setPastNotifications(refreshData || []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Notification Center</h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="font-bold mb-2">Create Notification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border rounded bg-gray-700 text-white"
            required
          />
          <textarea
            value={body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
            placeholder="Body"
            className="w-full p-2 border rounded h-32 bg-gray-700 text-white"
            required
          />
          <select value={target} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTarget(e.target.value)} className="w-full p-2 border rounded bg-gray-700 text-white">
            <option>All</option>
            <option>Specific Dept</option>
            <option>Specific Year</option>
          </select>
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
      <h2 className="font-bold mb-2">Past Notifications</h2>
      <table className="w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Sent To</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {pastNotifications.map(notif => (
            <tr key={notif.id} className="border-t">
              <td className="p-2">{notif.title}</td>
              <td className="p-2">{notif.date}</td>
              <td className="p-2">{notif.sentTo}</td>
              <td className="p-2">{notif.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminNotifications;