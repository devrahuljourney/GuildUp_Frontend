import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSubject,
  addRecipient,
  removeRecipient,
  setRecipients,
} from '../slices/emailSchedularSlice';
import Papa from 'papaparse';

export default function SubjectAndReceipentMail() {
  const dispatch = useDispatch();
  const { subject, recipients } = useSelector(state => state.emailSchedular);
  const inputRef = useRef(null);
  const [error, setError] = useState(''); 

  const handleSubjectChange = (e) => {
    dispatch(setSubject(e.target.value));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const email = e.target.value.trim();

      if (!email) return;

      if (!validateEmail(email)) {
        setError('Invalid email format'); 
        return;
      }

      if (recipients.includes(email)) {
        setError('Email already added'); 
        return;
      }

      dispatch(addRecipient(email));
      e.target.value = '';
      setError(''); 
    }
  };

  const handleRemove = (email) => {
    dispatch(removeRecipient(email));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: function (results) {
        const emails = results.data.flat().filter(email => validateEmail(email));
        const uniqueEmails = [...new Set([...recipients, ...emails])].slice(0, 1000);
        dispatch(setRecipients(uniqueEmails));
      },
      error: function (err) {
        console.error('CSV parsing error:', err.message);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-lg backdrop-blur-md bg-[#1a1a1a]/70 border border-[#2a2a2a] text-white space-y-6">
      
      <div>
        <label className="block mb-2 font-semibold text-[#B9FD50]">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={handleSubjectChange}
          placeholder="Enter email subject"
          className="w-full bg-[#262626] text-white border border-[#3a3a3a] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#B9FD50] transition"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-[#B9FD50]">Recipients</label>
        <div className="flex flex-wrap gap-2 border border-[#3a3a3a] p-3 bg-[#262626] rounded-lg min-h-[70px]">
          {recipients.map(email => (
            <span
              key={email}
              className="bg-[#333] text-white text-sm px-3 py-1 rounded-full flex items-center shadow-sm"
            >
              {email}
              <button
                onClick={() => handleRemove(email)}
                className="ml-2 text-red-400 hover:text-red-600 font-bold"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Type email and press Enter"
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="flex-grow bg-transparent text-white border-none outline-none px-2"
          />
        </div>
        {error && <p className="text-red-400 mt-1 text-sm">{error}</p>} 
        <small className="text-gray-400">Max 1000 recipients. You can type or upload CSV.</small>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-[#B9FD50]">Upload CSV</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#B9FD50] file:text-black hover:file:bg-[#A3F447]"
        />
      </div>
    </div>
  );
}
