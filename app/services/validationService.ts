import { SalonApplication } from '../models/SalonApplication.js'
import { ContactInquiry } from '../models/ContactInquiry.js'
import type { IShopApplication } from '../models/SalonApplication.js'
import type { IContactInquiry } from '../models/ContactInquiry.js'

export interface IValidationResult {
  isValid: boolean
  errors: string[]
}

export class ValidationService {
  static validateShopApplication(data: Partial<IShopApplication>): IValidationResult {
    const application = new SalonApplication(data)
    const validation = application.validate()

    // Additional phone validation
    if (data.phone && !this.isValidPhone(data.phone)) {
      validation.errors.push('Invalid phone number format')
      validation.isValid = false
    }

    return validation
  }

  static validateContactInquiry(data: Partial<IContactInquiry>): IValidationResult {
    const inquiry = new ContactInquiry(data)
    return inquiry.validate()
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static isValidPhone(phone: string): boolean {
    // Allow international format: +1-234-567-8900, +1 234 567 8900, +12345678900
    const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  static isValidZipCode(zipCode: string, country = 'US'): boolean {
    const zipPatterns: Record<string, RegExp> = {
      US: /^\d{5}(-\d{4})?$/,
      CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
      UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/
    }

    const pattern = zipPatterns[country] || zipPatterns.US
    return pattern ? pattern.test(zipCode) : false
  }

  static sanitizeInput(input: unknown): unknown {
    if (typeof input !== 'string') return input

    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
  }

  static validateBusinessInfo(data: Record<string, unknown>): IValidationResult {
    const errors = []

    const name = data.name as string
    const address = data.address as string
    const city = data.city as string

    if (!name || name.length < 2 || name.length > 100) {
      errors.push('Business name must be between 2 and 100 characters')
    }

    if (!address || address.length < 5) {
      errors.push('Complete address is required')
    }

    if (!city || city.length < 2) {
      errors.push('City is required')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static validateContactInfo(data: Record<string, unknown>): IValidationResult {
    const errors = []

    const contactName = data.contactName as string
    const email = data.email as string
    const phone = data.phone as string

    if (!contactName || contactName.length < 2 || contactName.length > 100) {
      errors.push('Contact name must be between 2 and 100 characters')
    }

    if (!email || !this.isValidEmail(email)) {
      errors.push('Valid email address is required')
    }

    if (phone && !this.isValidPhone(phone)) {
      errors.push('Invalid phone number format')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Named exports for backward compatibility with tests
export const validateShopApplication = ValidationService.validateShopApplication.bind(ValidationService)
export const validateContactInquiry = ValidationService.validateContactInquiry.bind(ValidationService)
