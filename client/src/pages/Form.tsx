import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/NITS.png';

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    semester: '',
    phone: '',
    address: '',
    guardianName: '',
    guardianContact: '',
    photo: null,
    signature: null,
  });
  const [duesCleared, setDuesCleared] = useState(false); // TODO: Fetch from API
  const [formStatus, setFormStatus] = useState('Not Submitted'); // TODO: Fetch from API

  useEffect(() => {
    // TODO: Fetch pre-filled data from API
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files) {
      setFormData({ ...formData, [type]: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Submit to API
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 font-sans">
      <img src={Logo} alt="NIT Silchar" className="h-16 mb-6" />
      <h1 className="text-3xl font-bold text-[#004080] mb-6">Semester Registration Form</h1>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Prefilled fields */}
          <div>
            <label className="block text-[#004080] font-medium">Name</label>
            <input type="text" value="John Doe" readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" />
          </div>
          <div>
            <label className="block text-[#004080] font-medium">Scholar ID</label>
            <input type="text" value="123456" readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" />
          </div>
          <div>
            <label className="block text-[#004080] font-medium">Department</label>
            <input type="text" value="Computer Science" readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" />
          </div>
          <div>
            <label className="block text-[#004080] font-medium">Semester</label>
            <input name="semester" value={formData.semester} onChange={handleChange} placeholder="e.g., 5" className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#004080] focus:border-[#004080]" required />
          </div>
          <div>
            <label className="block text-[#004080] font-medium">Email</label>
            <input type="email" value="john@nits.ac.in" readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" />
          </div>
          {/* Editable fields */}
          <div>
            <label className="block text-[#004080] font-medium">Phone</label>
            <input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#004080] focus:border-[#004080]" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[#004080] font-medium">Current Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Current Address" className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#004080] focus:border-[#004080]" required />
          </div>
          <div>
            <label className="block text-[#004080] font-medium">Guardian Name</label>
            <input name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder="Guardian Name" className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#004080] focus:border-[#004080]" />
          </div>
          <div>
            <label className="block text-[#004080] font-medium">Guardian Contact</label>
            <input name="guardianContact" value={formData.guardianContact} onChange={handleChange} placeholder="Guardian Contact" className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#004080] focus:border-[#004080]" />
          </div>
          <div>
            <label className="block text-[#004080] font-medium">Upload Photo</label>
            <input type="file" onChange={(e) => handleFileChange(e, 'photo')} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-[#004080] font-medium">Upload Signature</label>
            <input type="file" onChange={(e) => handleFileChange(e, 'signature')} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <button type="submit" disabled={!duesCleared} className="w-full bg-[#004080] text-white py-2 rounded-md hover:bg-[#003366] disabled:bg-gray-400 transition duration-200">Submit Form</button>
      </div>
      <div className="mt-6 text-center">
        <span className={`px-4 py-2 rounded-full text-white text-sm font-medium ${formStatus === 'Not Submitted' ? 'bg-red-500' : formStatus === 'Submitted' ? 'bg-yellow-500' : formStatus === 'Under Review' ? 'bg-blue-500' : 'bg-green-500'}`}>Form Status: {formStatus}</span>
      </div>
    </div>
  );
}

export default Form;