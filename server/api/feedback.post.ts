import { defineEventHandler, readBody, createError } from 'h3';
import api from '../services/axios.service';
import { verifyRecaptchaToken } from '../utils/recaptcha';

export default defineEventHandler(async event => {
  try {
    // Read the request body
    const data = await readBody(event);

    // Validate required fields
    if (!data.message || data.message.trim() === '') {
      throw createError({
        statusCode: 400,
        message: 'Feedback message is required',
      });
    }

    await verifyRecaptchaToken(event, data.recaptchaToken, 'contact_inquiry');

    const { recaptchaToken, ...payload } = data;

    // Send feedback to the backend API
    await api.post('/api/feedbacks', {
      data: payload,
    });

    return {
      success: true,
      message: 'Feedback submitted successfully',
    };
  } catch (e: any) {
    console.error('Error processing feedback:', e.response.data);

    throw createError({
      statusCode: e?.response.data.error.statusCode || 500,
      message: e?.response.data.error.message || 'An error occurred while submitting feedback',
    });
  }
});
