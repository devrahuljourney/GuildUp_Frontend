import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../slices/emailSchedularSlice';

export default function RichTextEditor() {
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.emailSchedular);
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(message); 
      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        dispatch(setMessage(html));
      });
    }
  }, [quill, dispatch]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-lg backdrop-blur-md bg-[#1a1a1a]/70 border border-[#2a2a2a] text-white space-y-4">
      <label className="block font-semibold text-[#B9FD50] mb-2">Message</label>
      <div className="bg-white text-black rounded-lg overflow-hidden">
        <div ref={quillRef} style={{ height: 250 }} />
      </div>
    </div>
  );
}
