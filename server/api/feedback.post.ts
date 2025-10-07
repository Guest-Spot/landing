import { defineEventHandler, readBody, createError } from 'h3';
import api from '../services/axios.service';
import { verifyRecaptchaToken } from '../utils/recaptcha';
import { applyRateLimit } from '../utils/rateLimiter';
import { withRequestQueue } from '../utils/requestQueue';

export default defineEventHandler(async event => {
  applyRateLimit(event, { action: 'contact_inquiry' });

  return withRequestQueue('contact_inquiry', async () => {
    try {
      const data = await readBody(event);

      if (!data.message || data.message.trim() === '') {
        throw createError({
          statusCode: 400,
          message: 'Feedback message is required',
        });
      }

      await verifyRecaptchaToken(event, data.recaptchaToken, 'contact_inquiry');

      const { recaptchaToken, ...payload } = data;

      await api.post('/api/feedbacks', {
        data: payload,
      });

      return {
        success: true,
        message: 'Feedback submitted successfully',
      };
    } catch (e: any) {
      console.error('Error processing feedback:', e?.response?.data || e);

      throw createError({
        statusCode: e?.response?.data?.error?.statusCode || e?.statusCode || 500,
        message: e?.response?.data?.error?.message || e?.message || 'An error occurred while submitting feedback',
      });
    }
  });
});
