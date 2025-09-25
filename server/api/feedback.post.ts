import { defineEventHandler, readBody, createError } from 'h3';
import api from '../services/axios.service';

export default defineEventHandler(async event => {
  try {
    // Read the request body
    const body = await readBody(event);

    // Validate required fields
    if (!body.message || body.message.trim() === '') {
      throw createError({
        statusCode: 400,
        message: 'Feedback message is required',
      });
    }

    // Prepare feedback data with optional fields
    const feedbackData = {
      message: body.message,
    };

    // Send feedback to the backend API
    await api.post('/api/feedbacks', feedbackData);

    return {
      success: true,
      message: 'Feedback submitted successfully',
    };
  } catch (error: any) {
    console.error('Error processing feedback:', error);

    throw createError({
      statusCode: error?.statusCode || 500,
      message: error?.message || 'An error occurred while submitting feedback',
    });
  }
});
