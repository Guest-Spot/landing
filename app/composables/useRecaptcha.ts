import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-script'
let recaptchaLoadPromise: Promise<void> | null = null

const loadRecaptchaScript = (siteKey: string) => {
  if (!process.client) {
    return Promise.reject(new Error('reCAPTCHA is only available in the browser'))
  }

  if (window.grecaptcha) {
    return new Promise<void>(resolve => {
      window.grecaptcha?.ready(() => resolve())
    })
  }

  if (recaptchaLoadPromise) {
    return recaptchaLoadPromise
  }

  recaptchaLoadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID) as HTMLScriptElement | null

    const handleLoad = () => {
      if (!window.grecaptcha) {
        reject(new Error('Failed to initialise reCAPTCHA'))
        recaptchaLoadPromise = null
        return
      }

      window.grecaptcha.ready(() => resolve())
    }

    const handleError = () => {
      reject(new Error('Failed to load reCAPTCHA'))
      recaptchaLoadPromise = null
    }

    if (existingScript) {
      existingScript.addEventListener('load', handleLoad, { once: true })
      existingScript.addEventListener('error', handleError, { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = RECAPTCHA_SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
    script.async = true
    script.defer = true
    script.addEventListener('load', handleLoad, { once: true })
    script.addEventListener('error', handleError, { once: true })
    document.head.appendChild(script)
  })

  return recaptchaLoadPromise
}

export const useRecaptcha = () => {
  const config = useRuntimeConfig()
  const siteKey = config.public?.recaptchaSiteKey || ''

  const recaptchaError = ref('')
  const isRecaptchaLoading = ref(false)

  const executeRecaptcha = async (action: string): Promise<string> => {
    recaptchaError.value = ''

    if (!siteKey) {
      recaptchaError.value = 'reCAPTCHA is not configured'
      return ''
    }

    if (!process.client) {
      recaptchaError.value = 'reCAPTCHA can only run in the browser'
      return ''
    }

    try {
      isRecaptchaLoading.value = true
      await loadRecaptchaScript(siteKey)

      if (!window.grecaptcha) {
        throw new Error('reCAPTCHA failed to initialise')
      }

      return await window.grecaptcha.execute(siteKey, { action })
    } catch (error) {
      recaptchaError.value =
        error instanceof Error ? error.message : 'Unable to complete reCAPTCHA verification'
      return ''
    } finally {
      isRecaptchaLoading.value = false
    }
  }

  return {
    siteKey,
    recaptchaError,
    isRecaptchaLoading,
    executeRecaptcha
  }
}
