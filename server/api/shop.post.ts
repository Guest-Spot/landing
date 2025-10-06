import { defineEventHandler, readBody, createError } from 'h3';
import api from '../services/axios.service';

export default defineEventHandler(async event => {
  try {
    // Read the request body
    const data = await readBody(event);

    // Validate required fields
    if (!data.name || data.name.trim() === '') {
      throw createError({
        statusCode: 400,
        message: 'Shop name is required',
      });
    }

    // Send feedback to the backend API
    await api.post('/api/shops', {
      data,
    });

    return {
      success: true,
      message: 'Shop submitted successfully',
    };
  } catch (e: any) {
    console.error('Error processing shop:', e.response.data);

    throw createError({
      statusCode: e?.response.data.error.statusCode || 500,
      message: e?.response.data.error.message || 'An error occurred while submitting shop',
    });
  }
});
