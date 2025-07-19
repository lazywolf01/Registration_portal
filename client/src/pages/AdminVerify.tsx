import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface Student {
  id: string;
  scholarId: string;
  name: string;
  department: string;
  subjects?: string[];
  semester: string;
  status: string;
  // Add other fields as needed
}

function AdminVerify() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('status', 'pending');

      if (error) console.error('Error fetching students:', error);
      else setStudents(data || []);
    };

    fetchStudents();
  }, []);

  const openModal = (student: Student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('students')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) console.error('Error approving:', error);
    else {
      setStudents(students.filter(s => s.id !== id));
      closeModal();
    }
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from('students')
      .update({ status: 'rejected', remarks })
      .eq('id', id);

    if (error) console.error('Error rejecting:', error);
    else {
      setStudents(students.filter(s => s.id !== id));
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Registration Verifications</h1>
      <table className="w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Scholar ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Department</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="border-t">
              <td className="p-2">{student.scholarId}</td>
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.department}</td>
              <td className="p-2">
                <button onClick={() => openModal(student)} className="text-blue-400">View Summary</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Form Summary for {selectedStudent.name}</h2>
            <p>Subjects: {selectedStudent.subjects?.join(', ')}</p>
            <p>Semester: {selectedStudent.semester}</p>
            {/* Add more summary fields */}
            <div className="mt-4">
              <textarea
                value={remarks}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRemarks(e.target.value)}
                placeholder="Leave a remark (e.g., Signature unclear)"
                className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => handleApprove(selectedStudent.id)} className="bg-green-700 text-white px-4 py-2 rounded">Approve</button>
                <button onClick={() => handleReject(selectedStudent.id)} className="bg-red-700 text-white px-4 py-2 rounded">Reject</button>
                <button onClick={closeModal} className="bg-gray-600 text-white px-4 py-2 rounded">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminVerify;