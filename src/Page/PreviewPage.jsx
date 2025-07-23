import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { emailSchedular } from '../services/operations/schedulerAPI';
import { useLocation } from 'react-router-dom';

export default function PreviewPage() {
  const {
    subject,
    message,
    recipients,
    scheduleTime,
    timezone,
  } = useSelector(state => state.emailSchedular);

  const [loading, setLoading] = useState(false);

  const formattedTime = scheduleTime
    ? new Date(scheduleTime).toLocaleString('en-IN', { timeZone: timezone })
    : 'Not set';

    const { state } = useLocation();
    const attachments = state?.attachments || [];
  

  const submitHandler = async () => {
    if (!subject || !message || recipients.length === 0 || !scheduleTime || !timezone) {
      alert("Please fill all required fields before scheduling.");
      return;
    }
    setLoading(true);
    try {
      const res = await emailSchedular(
        subject,
        message,
        recipients,
        attachments,
        scheduleTime,
        timezone
      );
      console.log("API Response:", res);
      alert("Scheduled Successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#1e1e1e] rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-[#B9FD50] mb-6">
          📤 Preview Email
        </h2>

        <div className="mb-4">
          <p className="text-[#B9FD50] font-semibold">Subject:</p>
          <p className="text-white ml-2">{subject || '—'}</p>
        </div>

        <div className="mb-4">
          <p className="text-[#B9FD50] font-semibold">Message:</p>
          <div
            className="prose prose-invert bg-[#2a2a2a] rounded-md p-3 mt-1"
            dangerouslySetInnerHTML={{ __html: message || '<p>—</p>' }}
          />
        </div>

        <div className="mb-4">
          <p className="text-[#B9FD50] font-semibold">Recipients:</p>
          {recipients.length > 0 ? (
            <ul className="list-disc ml-6 text-white mt-1">
              {recipients.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          ) : (
            <p className="ml-2 text-white">None</p>
          )}
        </div>

        <div className="mb-4">
          <p className="text-[#B9FD50] font-semibold">Attachments:</p>
          {attachments.length > 0 ? (
            <ul className="list-disc ml-6 text-white mt-1">
              {attachments.map((file, index) => (
                <li key={index}>📎 {file.name}</li>
              ))}
            </ul>
          ) : (
            <p className="ml-2 text-white">None</p>
          )}
        </div>

        <div className="mb-4">
          <p className="text-[#B9FD50] font-semibold">Scheduled Time (IST):</p>
          <p className="ml-2 text-white">{formattedTime}</p>
        </div>

        <div className="mb-4">
          <p className="text-[#B9FD50] font-semibold">Timezone:</p>
          <p className="ml-2 text-white">{timezone}</p>
        </div>

        <button
          onClick={submitHandler}
          className="bg-[#B9FD50] text-black px-6 py-2 mt-4 rounded-lg hover:bg-lime-400 transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Scheduling...' : 'Confirm & Schedule'}
        </button>
      </div>
    </div>
  );
}
