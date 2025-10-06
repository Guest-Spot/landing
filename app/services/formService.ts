import { ValidationService } from './validationService.js'
import type { IShopApplication } from '../models/SalonApplication.js'
import type { IContactInquiry } from '../models/ContactInquiry.js'

export interface IFormSubmissionResult {
  success: boolean
  message: string
  id?: string
  error?: string
  fallback?: boolean
}

export interface IFormServiceResponse {
  ok: boolean
  status: number
  data: unknown
  id: string | null
}

export class FormService {
  async submitShopApplication(data: Partial<IShopApplication>): Promise<IFormSubmissionResult> {
    try {
      // Validate data first
      const validation = ValidationService.validateShopApplication(data)
      if (!validation.isValid) {
        throw new Error('Validation failed: ' + validation.errors.join(', '))
      }

      // Sanitize input
      const sanitizedData = this.sanitizeFormData(data)

      // Submit to form service
      const response = await this.submitToFormService(sanitizedData, '/api/shop')

      if (response.ok) {
        return {
          success: true,
          message: 'Application submitted successfully! We will contact you within 24 hours.',
          id: response.id || this.generateSubmissionId()
        }
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Shop application submission error:', error)
      return {
        success: false,
        message: 'Failed to submit application. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async submitContactInquiry(data: Partial<IContactInquiry>): Promise<IFormSubmissionResult> {
    try {
      // Validate data first
      const validation = ValidationService.validateContactInquiry(data)
      if (!validation.isValid) {
        throw new Error('Validation failed: ' + validation.errors.join(', '))
      }

      // Sanitize input
      const sanitizedData = this.sanitizeFormData(data)

      // Submit to form service
      const response = await this.submitToFormService(sanitizedData, '/api/feedback')

      if (response.ok) {
        return {
          success: true,
          message: 'Message sent successfully! We will respond within 24 hours.',
          id: response.id || this.generateSubmissionId()
        }
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Contact inquiry submission error:', error)
      return {
        success: false,
        message: 'Failed to send message. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async submitToFormService(data: Record<string, unknown>, path: string): Promise<IFormServiceResponse> {
    const response = await $fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return {
      ok: true,
      status: 200,
      data: response,
      id: null
    }
  }

  sanitizeFormData(data: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitized[key] = ValidationService.sanitizeInput(value)
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item =>
          typeof item === 'string' ? ValidationService.sanitizeInput(item) : item
        )
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }

  generateSubmissionId(): string {
    return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }
}
