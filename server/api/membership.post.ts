import { defineEventHandler, readBody, createError } from 'h3';
import qs from 'qs';
import api from '../services/axios.service';
import { verifyRecaptchaToken } from '../utils/recaptcha';
import { applyRateLimit } from '../utils/rateLimiter';
import { withRequestQueue } from '../utils/requestQueue';

const query = qs.stringify({
  status: 'draft',
}, {
  encodeValuesOnly: true, // prettify URL
});

export default defineEventHandler(async event => {
  applyRateLimit(event, { action: 'membership_request' });

  return withRequestQueue('membership_request', async () => {
    try {
      const data = await readBody(event);

      if (!data.type || data.type.trim() === '') {
        throw createError({
          statusCode: 400,
          message: 'Membership type is required',
        });
      }

      await verifyRecaptchaToken(
        event,
        data.recaptchaToken,
        data.type === 'artist' ? 'artist_application' : 'shop_application',
      );

      const { recaptchaToken, ...payload } = data;

      await api.post(`/api/membership-requests?${query}`, {
        data: payload,
      });

      return {
        success: true,
        message: 'Membership submitted successfully',
      };
    } catch (e: any) {
      console.error('Error processing membership:', e?.response?.data || e);

      throw createError({
        statusCode: e?.response?.data?.error?.statusCode || e?.statusCode || 500,
        message: e?.response?.data?.error?.message || e?.message || 'An error occurred while submitting membership',
      });
    }
  });
});
