import React, { useState } from 'react';
import Logo from '../assets/NITS.png'; // Assuming the logo is in assets

interface Notification {
  id: number;
  title: string;
  body: string;
  date: string; // e.g., '2023-10-01'
  type: 'Fee Issue' | 'Document Rejection' | 'Approval Update' | 'Other';
  read: boolean;
}

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'Registration Deadline', body: 'Reminder: Submit by 15th Jan.', date: '2023-10-05', type: 'Approval Update', read: false },
    { id: 2, title: 'Dues Update', body: 'New dues policy effective.', date: '2023-09-20', type: 'Fee Issue', read: true },
    { id: 3, title: 'Document Rejected', body: 'Your receipt was rejected. Please re-upload.', date: '2023-10-10', type: 'Document Rejection', read: false },
    // TODO: Fetch from API
  ]);

  // Sort by date descending
  const sortedNotifications = [...notifications].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Fee Issue': return 'bg-orange-100 text-orange-800';
      case 'Document Rejection': return 'bg-red-100 text-red-800';
      case 'Approval Update': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6 font-sans">
      <img src={Logo} alt="NIT Silchar Logo" className="w-24 h-24 mb-6" />
      <h1 className="text-3xl font-bold text-[#004080] mb-2">Notifications</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">View your latest messages and reminders from admin, sorted by date.</p>
      
      <ul className="w-full max-w-2xl space-y-6">
        {sortedNotifications.map(notif => (
          <li 
            key={notif.id} 
            className={`bg-white rounded-xl shadow-md p-6 ${notif.read ? '' : 'border-l-4 border-[#FF6600]'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-[#004080]">{notif.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(notif.type)}`}>
                {notif.type}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{notif.body}</p>
            <p className="text-sm text-gray-500 mb-4">{notif.date}</p>
            {!notif.read && (
              <button 
                onClick={() => markAsRead(notif.id)} 
                className="text-[#004080] hover:text-[#FF6600] text-sm font-medium"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;