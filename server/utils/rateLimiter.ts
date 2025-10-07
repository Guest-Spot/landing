import { createError, type H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'
import { getClientIp } from './request'

interface RateLimitOptions {
  action: string
  windowMs?: number
  maxRequests?: number
}

interface RateLimitState {
  count: number
  expiresAt: number
}

const requestCounts = new Map<string, RateLimitState>()

export const applyRateLimit = (event: H3Event, options: RateLimitOptions) => {
  const config = useRuntimeConfig()
  const windowMs =
    options.windowMs || Number(config.rateLimitWindowMs) || 60_000
  const maxRequests =
    options.maxRequests || Number(config.rateLimitMaxRequests) || 5

  const ip = getClientIp(event) || 'unknown'
  const key = `${options.action}:${ip}`
  const now = Date.now()
  const state = requestCounts.get(key)

  if (!state || state.expiresAt <= now) {
    requestCounts.set(key, {
      count: 1,
      expiresAt: now + windowMs
    })
    return
  }

  if (state.count >= maxRequests) {
    const retryAfter = Math.ceil((state.expiresAt - now) / 1000)
    event.node.res.setHeader('Retry-After', retryAfter.toString())

    throw createError({
      statusCode: 429,
      message: 'Too many requests. Please try again later.'
    })
  }

  state.count += 1
}
