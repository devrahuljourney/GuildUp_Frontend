import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '',
  message: '', 
  recipients: [], 
  attachments: [], 
  scheduleTime: '',
  timezone: 'Asia/Kolkata', 
};

const emailSchedulerSlice = createSlice({
  name: 'emailScheduler',
  initialState,
  reducers: {
    setSubject: (state, action) => { state.subject = action.payload; },
    setMessage: (state, action) => { state.message = action.payload; },
    setRecipients: (state, action) => { state.recipients = action.payload; },
    addRecipient: (state, action) => {
      if (!state.recipients.includes(action.payload)) {
        state.recipients.push(action.payload);
      }
    },
    removeRecipient: (state, action) => {
      state.recipients = state.recipients.filter(email => email !== action.payload);
    },
    setAttachments: (state, action) => { state.attachments = action.payload; },
    addAttachment: (state, action) => { state.attachments.push(action.payload); },
    removeAttachment: (state, action) => {
      state.attachments = state.attachments.filter(file => file.name !== action.payload);
    },
    setScheduleTime: (state, action) => { state.scheduleTime = action.payload; },
    setTimezone: (state, action) => { state.timezone = action.payload; },
    resetEmailScheduler: () => initialState
  },
});

export const {
  setSubject,
  setMessage,
  setRecipients,
  addRecipient,
  removeRecipient,
  setAttachments,
  addAttachment,
  removeAttachment,
  setScheduleTime,
  setTimezone,
  resetEmailScheduler
} = emailSchedulerSlice.actions;

export default emailSchedulerSlice.reducer;
