import React, { useState } from 'react';
import Logo from '../assets/NITS.png'; // Assuming the logo is in assets

function MyDocuments() {
  const [documents, setDocuments] = useState({
    receipt: { file: 'receipt.pdf', status: 'Pending', comments: '' },
    signedForm: { file: '', status: 'Not Uploaded', comments: '' },
  }); // TODO: Fetch from API

  const handleUpload = (type: string, file: File | null) => {
    if (file) {
      // TODO: Upload to API and update status
      setDocuments(prev => ({
        ...prev,
        [type]: { file: file.name, status: 'Pending', comments: '' }
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6 font-sans">
      <img src={Logo} alt="NIT Silchar Logo" className="w-24 h-24 mb-6" />
      <h1 className="text-3xl font-bold text-[#004080] mb-2">My Documents</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">Upload your fee payment receipt and signed registration form. Track their verification status here.</p>
      
      <div className="w-full max-w-2xl space-y-8">
        {/* Fee Payment Receipt */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#004080] mb-4">Fee Payment Receipt</h2>
          <input 
            type="file" 
            accept=".pdf,.jpg,.jpeg,.png" 
            onChange={(e) => handleUpload('receipt', e.target.files?.[0] || null)} 
            className="mb-4 w-full p-2 border border-gray-300 rounded-lg"
          />
          {documents.receipt.file && (
            <div>
              <a href={documents.receipt.file} target="_blank" rel="noreferrer" className="text-[#004080] hover:underline">View Uploaded Receipt</a>
              <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(documents.receipt.status)}`}>
                {documents.receipt.status}
              </span>
              {documents.receipt.status === 'Rejected' && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-[#004080]">Admin Comments</h3>
                  <p className="text-gray-700">{documents.receipt.comments || 'No comments yet.'}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Signed Registration Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#004080] mb-4">Signed Registration Form (PDF)</h2>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={(e) => handleUpload('signedForm', e.target.files?.[0] || null)} 
            className="mb-4 w-full p-2 border border-gray-300 rounded-lg"
          />
          {documents.signedForm.file && (
            <div>
              <a href={documents.signedForm.file} target="_blank" rel="noreferrer" className="text-[#004080] hover:underline">View Uploaded Form</a>
              <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(documents.signedForm.status)}`}>
                {documents.signedForm.status}
              </span>
              {documents.signedForm.status === 'Rejected' && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-[#004080]">Admin Comments</h3>
                  <p className="text-gray-700">{documents.signedForm.comments || 'No comments yet.'}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyDocuments;