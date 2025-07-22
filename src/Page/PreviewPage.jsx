import React from 'react';
import { useSelector } from 'react-redux';

export default function PreviewPage() {
  const {
    subject,
    message,
    recipients,
    attachments,
    scheduleTime,
    timezone,
  } = useSelector(state => state.emailSchedular);

  // ✅ Convert scheduleTime to IST + add 1 hour latency
  const formattedTime = scheduleTime
  ? new Date(new Date(scheduleTime).getTime() + 60 * 60 * 1000)
      .toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  : 'Not set';




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
          <p className="text-[#B9FD50] font-semibold">Scheduled Time (IST + 1hr):</p>
          <p className="ml-2 text-white">{formattedTime}</p>
        </div>

        <div>
          <p className="text-[#B9FD50] font-semibold">Timezone:</p>
          <p className="ml-2 text-white">Asia/Kolkata (IST)</p>
        </div>
      </div>
    </div>
  );
}
