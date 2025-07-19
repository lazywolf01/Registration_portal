import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  email: string;
  aadhar: string;
  guardian: string;
  photo: string;
  signature: string;
  receipt: string;
  subjects?: string[];
  semester: string;
  duesReceipt: string;
  activityLog?: string[];
}

function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null); // TODO: Fetch from API using id
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    // TODO: Fetch student data from Supabase
  }, [id]);

  const handleApprove = () => {
    // TODO: API call to approve
  };

  const handleReject = () => {
    // TODO: API call to reject with remarks
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Student Profile: {student.name}</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Personal Details</h2>
          <p>Name: {student.name}</p>
          <p>Email: {student.email}</p>
          <p>Aadhar: {student.aadhar}</p>
          <p>Guardian: {student.guardian}</p>
          {/* Add more */}
        </div>
        {/* Uploaded Documents */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Uploaded Documents</h2>
          <img src={student.photo} alt="Photo" className="w-32 h-32 mb-2" />
          <img src={student.signature} alt="Signature" className="w-32 h-8 mb-2" />
          <a href={student.receipt} className="text-blue-600">View Receipt</a>
        </div>
        {/* Registration Form Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Registration Form Summary</h2>
          <p>Subjects: {student.subjects?.join(', ') ?? ''}</p>
          <p>Semester: {student.semester}</p>
          {/* Add more */}
        </div>
        {/* Dues Receipt View */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Dues Receipt</h2>
          <a href={student.duesReceipt} className="text-blue-600">Download Receipt</a>
        </div>
      </div>
      {/* Admin Actions */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">Admin Actions</h2>
        <button onClick={handleApprove} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Approve Registration</button>
        <button onClick={handleReject} className="bg-red-600 text-white px-4 py-2 rounded">Reject Registration</button>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add Remarks (optional)"
          className="w-full p-2 border rounded mt-4"
        />
      </div>
      {/* Activity Log */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">Activity Log</h2>
        <ul className="list-disc pl-5">
          {student.activityLog?.map((log: string, index: number) => (
            <li key={index}>{log}</li>
          )) ?? []}
        </ul>
      </div>
    </div>
  );
}

export default StudentProfile;