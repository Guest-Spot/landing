import type { H3Event } from 'h3';

export const getClientIp = (event: H3Event): string | undefined => {
  const forwarded = event.node.req.headers['x-forwarded-for'];

  if (typeof forwarded === 'string' && forwarded.length > 0) {
    const [first] = forwarded.split(',');
    return first?.trim();
  }

  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0];
  }

  return event.node.req.socket.remoteAddress || undefined;
};
