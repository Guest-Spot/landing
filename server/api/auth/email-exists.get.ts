import { defineEventHandler, getQuery, createError } from 'h3';
import api from '../../services/axios.service';

const FAILED_MESSAGE = 'Failed to check email existence';

export default defineEventHandler(async event => {
  try {
    const { email } = getQuery(event);

    if (!email || typeof email !== 'string') {
      throw createError({
        statusCode: 400,
        message: 'Email query parameter is required',
      });
    }

    const response = await api.get(`/api/auth/email-exists?email=${email}`);

    if (typeof response?.data?.exists !== 'boolean') {
      throw createError({
        statusCode: 500,
        message: FAILED_MESSAGE,
      });
    }

    return {
      exists: response?.data?.exists,
    };
  } catch (error: any) {
    console.error('Error checking email existence:', error?.response?.data || error);

    throw createError({
      statusCode: error?.response?.status || error?.statusCode || 500,
      message: error?.response?.data?.error?.message || error?.message || FAILED_MESSAGE,
    });
  }
});
