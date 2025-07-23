import axios from "axios";
import { emailSchedulerEndpoints } from "../api";

const { EMAIL_SCHEDULAR } = emailSchedulerEndpoints;

export async function emailSchedular(subject, message, recipients, attachments, scheduleTime, timezone) {
  try {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("scheduleTime", scheduleTime);
    formData.append("timezone", timezone);

    recipients.forEach((email, index) => {
      formData.append(`recipients[${index}]`, email);
    });

    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    const response = await axios.post(EMAIL_SCHEDULAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("EMAIL SCHEDULER RESPONSE:", response.data);
    return response.data;
  } catch (error) {
    console.error("EMAIL SCHEDULER ERROR:", error);

    if (error.response) {
    
      console.log("Server Error:", error.response.data);
      console.log("Status Code:", error.response.status);
    } else if (error.request) {
      
      console.log("No response received:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    return null;
  }
}
