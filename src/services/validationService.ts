import { SalonApplication } from '../models/SalonApplication.js'
import { ContactInquiry } from '../models/ContactInquiry.js'

export class ValidationService {
  static validateSalonApplication(data) {
    const application = new SalonApplication(data)
    const validation = application.validate()

    // Additional phone validation
    if (data.phone && !this.isValidPhone(data.phone)) {
      validation.errors.push('Invalid phone number format')
      validation.isValid = false
    }

    return validation
  }

  static validateContactInquiry(data) {
    const inquiry = new ContactInquiry(data)
    return inquiry.validate()
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static isValidPhone(phone) {
    // Allow international format: +1-234-567-8900, +1 234 567 8900, +12345678900
    const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  static isValidZipCode(zipCode, country = 'US') {
    const zipPatterns = {
      US: /^\d{5}(-\d{4})?$/,
      CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
      UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/
    }

    const pattern = zipPatterns[country] || zipPatterns.US
    return pattern.test(zipCode)
  }

  static sanitizeInput(input) {
    if (typeof input !== 'string') return input

    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
  }

  static validateBusinessInfo(data) {
    const errors = []

    if (!data.businessName || data.businessName.length < 2 || data.businessName.length > 100) {
      errors.push('Business name must be between 2 and 100 characters')
    }

    if (!data.address || data.address.length < 5) {
      errors.push('Complete address is required')
    }

    if (!data.city || data.city.length < 2) {
      errors.push('City is required')
    }

    if (!data.state || data.state.length < 2) {
      errors.push('State/Province is required')
    }

    if (!data.country || data.country.length < 2) {
      errors.push('Country is required')
    }

    if (data.zipCode && !this.isValidZipCode(data.zipCode, data.country)) {
      errors.push('Invalid postal code format')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static validateContactInfo(data) {
    const errors = []

    if (!data.contactName || data.contactName.length < 2 || data.contactName.length > 100) {
      errors.push('Contact name must be between 2 and 100 characters')
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email address is required')
    }

    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.push('Invalid phone number format')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Named exports for backward compatibility with tests
export const validateSalonApplication = ValidationService.validateSalonApplication.bind(ValidationService)
export const validateContactInquiry = ValidationService.validateContactInquiry.bind(ValidationService)
