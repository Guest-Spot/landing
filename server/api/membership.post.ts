import { defineEventHandler, readBody, createError } from 'h3';
import qs from 'qs';
import api from '../services/axios.service';

const query = qs.stringify({
  status: 'draft',
}, {
  encodeValuesOnly: true, // prettify URL
});

export default defineEventHandler(async event => {
  try {
    // Read the request body
    const data = await readBody(event);

    // Validate required fields
    if (!data.type || data.type.trim() === '') {
      throw createError({
        statusCode: 400,
        message: 'Membership type is required',
      });
    }

    // Send feedback to the backend API
    await api.post(`/api/membership-requests?${query}`, {
      data,
    });

    return {
      success: true,
      message: 'Membership submitted successfully',
    };
  } catch (e: any) {
    console.error('Error processing membership:', e.response.data);

    throw createError({
      statusCode: e?.response.data.error.statusCode || 500,
      message: e?.response.data.error.message || 'An error occurred while submitting membership',
    });
  }
});
