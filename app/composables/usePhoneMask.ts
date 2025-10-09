import { ref } from 'vue'

const PHONE_MAX_LENGTH = 15

/**
 * Format phone number with mask: 123-456-7890 or +1 123-456-7890
 * @param value - Raw phone number string
 * @returns Formatted phone number string
 */
export const formatPhoneNumber = (value: string): string => {
  const trimmedValue = value.trim()
  const hasPlus = trimmedValue.startsWith('+')
  const digits = trimmedValue.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH)

  if (!digits) {
    return hasPlus ? '+' : ''
  }

  const formatSegments = (inputDigits: string): string => {
    const part1 = inputDigits.slice(0, 3)
    const part2 = inputDigits.slice(3, 6)
    const part3 = inputDigits.slice(6, 10)
    const extension = inputDigits.slice(10)

    let formatted = ''

    if (part1) {
      formatted += part1
    }

    if (part2) {
      formatted += (formatted ? '-' : '') + part2
    }

    if (part3) {
      formatted += (formatted ? '-' : '') + part3
    }

    if (extension) {
      formatted += `${formatted ? ' ' : ''}${extension}`
    }

    return formatted
  }

  if (hasPlus) {
    if (digits.length <= 10) {
      return `+${formatSegments(digits)}`
    }

    const localDigits = digits.slice(-10)
    const countryCode = digits.slice(0, digits.length - 10)
    const formattedLocal = formatSegments(localDigits)

    return `${countryCode ? `+${countryCode}` : '+'}${formattedLocal ? ` ${formattedLocal}` : ''}`.trim()
  }

  if (digits.length <= 10) {
    return formatSegments(digits)
  }

  const formattedPrimary = formatSegments(digits.slice(0, 10))
  const extension = digits.slice(10)

  return `${formattedPrimary}${extension ? ` ${extension}` : ''}`
}

/**
 * Composable for phone number masking functionality
 * @returns Phone mask utilities and event handlers
 */
export const usePhoneMask = () => {
  const phoneValue = ref('')

  /**
   * Apply phone mask to value and update input element
   * @param inputValue - Raw input value
   * @param target - HTML input element (optional)
   */
  const applyPhoneMask = (inputValue: string, target?: HTMLInputElement | null) => {
    const formatted = formatPhoneNumber(inputValue)
    if (phoneValue.value !== formatted) {
      phoneValue.value = formatted
    }

    if (target && target.value !== formatted) {
      target.value = formatted
    }
  }

  /**
   * Handle input event with phone masking
   * @param event - Input event
   */
  const onPhoneInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    applyPhoneMask(target?.value ?? '', target)
  }

  /**
   * Handle paste event with phone masking
   * @param event - Clipboard event
   */
  const onPhonePaste = (event: ClipboardEvent) => {
    event.preventDefault()
    const pastedText = event.clipboardData?.getData('text') ?? ''
    const target = event.target as HTMLInputElement | null
    applyPhoneMask(pastedText, target)
  }

  /**
   * Handle blur event with phone masking
   */
  const onPhoneBlur = () => {
    applyPhoneMask(phoneValue.value)
  }

  return {
    phoneValue,
    formatPhoneNumber,
    applyPhoneMask,
    onPhoneInput,
    onPhonePaste,
    onPhoneBlur
  }
}

