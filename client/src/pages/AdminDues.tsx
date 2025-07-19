import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface Dues {
  id: string;
  scholarId: string;
  name: string;
  receipt: string;
  type: string;
  status: string;
  remarks?: string;
}

function AdminDues() {
  const [duesList, setDuesList] = useState<Dues[]>([]);
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDues = async () => {
      const { data, error } = await supabase
        .from('dues')
        .select('*')
        .eq('status', 'pending');

      if (error) console.error('Error fetching dues:', error);
      else setDuesList(data || []);
    };

    fetchDues();
  }, []);

  const handleAccept = async (id: string) => {
    const { error } = await supabase
      .from('dues')
      .update({ status: 'accepted' })
      .eq('id', id);

    if (error) console.error('Error accepting:', error);
    else setDuesList(duesList.filter(d => d.id !== id));
  };

  const handleReject = async (id: string) => {
    const remark = remarks[id] || '';
    const { error } = await supabase
      .from('dues')
      .update({ status: 'rejected', remarks: remark })
      .eq('id', id);

    if (error) console.error('Error rejecting:', error);
    else setDuesList(duesList.filter(d => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Dues Verification</h1>
      <table className="w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Scholar ID</th>
            <th className="p-2">Student Name</th>
            <th className="p-2">Receipt</th>
            <th className="p-2">Dues Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
            <th className="p-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {duesList.map(dues => (
            <tr key={dues.id} className="border-t">
              <td className="p-2">{dues.scholarId}</td>
              <td className="p-2">{dues.name}</td>
              <td className="p-2">
                <a href={dues.receipt} className="text-blue-400">Download</a>
              </td>
              <td className="p-2">{dues.type}</td>
              <td className="p-2">{dues.status}</td>
              <td className="p-2">
                <button onClick={() => handleAccept(dues.id)} className="bg-green-700 text-white px-2 py-1 rounded mr-2">Accept</button>
                <button onClick={() => handleReject(dues.id)} className="bg-red-700 text-white px-2 py-1 rounded">Reject</button>
              </td>
              <td className="p-2">
                <input type="text" value={remarks[dues.id] || ''} onChange={(e) => setRemarks({ ...remarks, [dues.id]: e.target.value })} placeholder="Remarks for rejection" className="w-full p-1 border rounded bg-gray-700 text-white" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDues;