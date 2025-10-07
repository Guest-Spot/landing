import { createError, type H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'
import { $fetch } from 'ofetch'
import { getClientIp } from './request'

interface RecaptchaVerificationResponse {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

export const verifyRecaptchaToken = async (
  event: H3Event,
  token: string | undefined,
  expectedAction?: string
): Promise<RecaptchaVerificationResponse> => {
  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Missing reCAPTCHA token'
    })
  }

  const config = useRuntimeConfig()
  const secretKey = config.recaptchaSecretKey as string

  if (!secretKey) {
    throw createError({
      statusCode: 500,
      message: 'reCAPTCHA secret key is not configured'
    })
  }

  const params = new URLSearchParams()
  params.append('secret', secretKey)
  params.append('response', token)

  const clientIp = getClientIp(event)
  if (clientIp) {
    params.append('remoteip', clientIp)
  }

  const verification = await $fetch<RecaptchaVerificationResponse>(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      body: params
    }
  )

  if (!verification.success) {
    throw createError({
      statusCode: 400,
      message: 'reCAPTCHA verification failed',
      data: {
        errors: verification['error-codes'] || []
      }
    })
  }

  const minimumScore = Number(config.recaptchaScoreThreshold || 0.5)
  if (typeof verification.score === 'number' && verification.score < minimumScore) {
    throw createError({
      statusCode: 400,
      message: 'reCAPTCHA score is below the acceptable threshold'
    })
  }

  if (expectedAction && verification.action && verification.action !== expectedAction) {
    throw createError({
      statusCode: 400,
      message: 'reCAPTCHA action does not match expected value'
    })
  }

  return verification
}
