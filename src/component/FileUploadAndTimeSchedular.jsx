import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScheduleTime } from '../slices/emailSchedularSlice';
import { useNavigate } from 'react-router-dom';

export default function FileUploadAndTimeSchedular() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { scheduleTime } = useSelector(state => state.emailSchedular);
  const [localAttachments, setLocalAttachments] = useState([]);
  const [fileError, setFileError] = useState('');
  const [error, setError] = useState('');

  const getLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!scheduleTime) {
      const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);
      dispatch(setScheduleTime(getLocalISOString(oneHourLater)));
    }
  }, [dispatch, scheduleTime]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);

    if (validFiles.length !== files.length) {
      setFileError('Some files exceeded 5MB and were skipped.');
    } else {
      setFileError('');
    }

    setLocalAttachments(prev => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setLocalAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleTimeChange = (e) => {
    const userInput = e.target.value;
    const selectedTime = new Date(userInput).getTime();
    const oneHourLater = Date.now() + 60 * 60 * 1000;

    // if (selectedTime < oneHourLater) {
    //   setError("Please select a time at least 1 hour from now.");
    //   return;
    // } else {
    //   setError("");
    // }

    dispatch(setScheduleTime(userInput));
  };

  const handlePreviewClick = () => {
    if (error) return;
    navigate('/preview', { state: { attachments: localAttachments } });
  };

  return (
    <div className="mt-8">
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-[#B9FD50]">Attachments (Max 5MB each)</label>
        <input
          type="file"
          multiple
          accept="*"
          onChange={handleFileChange}
          className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#B9FD50] file:text-black hover:file:bg-[#A3F447]"
        />
        {fileError && <p className="text-red-400 mt-1 text-sm">{fileError}</p>}
        {localAttachments.length > 0 && (
          <div className="mt-3 space-y-2">
            {localAttachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-[#262626] px-3 py-2 rounded-md">
                <span className="text-sm truncate">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-400 hover:text-red-600 font-bold text-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-[#B9FD50]">Schedule Time</label>
        <input
          type="datetime-local"
          value={scheduleTime}
          onChange={handleTimeChange}
          min={getLocalISOString(new Date())}
          className="w-full bg-[#262626] text-white border border-[#3a3a3a] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#B9FD50] transition"
        />
        <p className="text-sm text-gray-400 mt-1">Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handlePreviewClick}
          className="bg-[#B9FD50] text-black font-semibold py-2 px-6 rounded-lg hover:bg-[#A3F447] transition"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
