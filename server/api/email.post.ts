import { defineEventHandler, readBody, createError } from 'h3';
import api from '../services/axios.service';

export default defineEventHandler(async event => {
  try {
    // Read the request body
    const body = await readBody(event);

    // Simple validation
    if (!body.email || !body.email.includes('@')) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format',
      });
    }

    const { email } = body;

    await api.post('/api/emails', { email });

    return {
      success: true,
      message: 'Email saved successfully',
      email,
    };
  } catch (error: any) {
    console.error('Error processing email:', error);

    throw createError({
      statusCode: error?.statusCode || 500,
      message: error?.message || 'An error occurred while saving the email',
    });
  }
});
