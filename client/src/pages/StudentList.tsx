import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Student {
  id: string;
  scholarId: string;
  name: string;
  email: string;
  department: string;
  year: number;
  registrationStatus: string;
  duesStatus: string;
}

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]); // TODO: Fetch from API
  const [filters, setFilters] = useState({ department: '', year: '', status: '' });

  useEffect(() => {
    // TODO: Fetch students from Supabase with filters
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <div className="flex space-x-4 mb-4">
        <select name="department" onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Departments</option>
          <option>ECE</option>
          <option>CSE</option>
        </select>
        <select name="year" onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Years</option>
          <option>1</option>
          <option>2</option>
        </select>
        <select name="status" onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>Verified</option>
          <option>Rejected</option>
        </select>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Scholar ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Department</th>
            <th className="p-2">Year</th>
            <th className="p-2">Registration Status</th>
            <th className="p-2">Dues Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="border-t">
              <td className="p-2">{student.scholarId}</td>
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.email}</td>
              <td className="p-2">{student.department}</td>
              <td className="p-2">{student.year}</td>
              <td className="p-2">{student.registrationStatus}</td>
              <td className="p-2">{student.duesStatus}</td>
              <td className="p-2">
                <Link to={`/admin/students/${student.id}`} className="text-blue-600">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;