import { ValidationService } from './validationService.js'
import type { ISalonApplication } from '../models/SalonApplication.js'
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
  async submitSalonApplication(data: Partial<ISalonApplication>): Promise<IFormSubmissionResult> {
    try {
      // Validate data first
      const validation = ValidationService.validateSalonApplication(data)
      if (!validation.isValid) {
        throw new Error('Validation failed: ' + validation.errors.join(', '))
      }

      // Sanitize input
      const sanitizedData = this.sanitizeFormData(data)

      // Prepare submission data
      const submissionData = {
        ...sanitizedData,
        formType: 'salon-application',
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      }

      // Submit to form service
      const response = await this.submitToFormService(submissionData, '/api/feedback')

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
      console.error('Salon application submission error:', error)
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

  // Fallback email submission (opens user's email client)
  submitViaEmail(data: Record<string, unknown>, formType: string): IFormSubmissionResult {
    const safeString = (value: unknown): string => {
      if (value === null || value === undefined) return ''
      if (typeof value === 'string') return value
      if (typeof value === 'number') return String(value)
      if (typeof value === 'boolean') return String(value)
      if (Array.isArray(value)) return value.join(', ')
      if (typeof value === 'object' && value !== null) {
        try {
          return JSON.stringify(value)
        } catch {
          return '[Object]'
        }
      }
      return '[Unknown]'
    }

    const subject = formType === 'salon-application'
      ? `Salon Application - ${safeString(data.businessName)}`
      : `Contact Inquiry - ${safeString(data.subject)}`

    const body = this.formatEmailBody(data, formType)
    const emailUrl = `mailto:info@guestspot.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.open(emailUrl)

    return {
      success: true,
      message: 'Email client opened. Please send the email to complete your submission.',
      fallback: true
    }
  }

  formatEmailBody(data: Record<string, unknown>, formType: string): string {
    const safeString = (value: unknown): string => {
      if (value === null || value === undefined) return ''
      if (typeof value === 'string') return value
      if (typeof value === 'number') return String(value)
      if (typeof value === 'boolean') return String(value)
      if (Array.isArray(value)) return value.join(', ')
      if (typeof value === 'object' && value !== null) {
        try {
          return JSON.stringify(value)
        } catch {
          return '[Object]'
        }
      }
      return '[Unknown]'
    }

    if (formType === 'salon-application') {
      const businessName = safeString(data.businessName)
      const contactName = safeString(data.contactName)
      const email = safeString(data.email)
      const phone = data.phone ? safeString(data.phone) : 'Not provided'
      const address = safeString(data.address)
      const city = safeString(data.city)
      const experience = safeString(data.experience)
      const portfolioUrl = data.portfolioUrl ? safeString(data.portfolioUrl) : 'Not provided'
      const specialties = data.specialties ? safeString(data.specialties) : 'Not provided'
      const message = data.message ? safeString(data.message) : 'No additional message'

      return [
        `Business Name: ${businessName}`,
        `Contact Name: ${contactName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Address: ${address}`,
        `City: ${city}`,
        `Experience: ${experience} years`,
        `Portfolio URL: ${portfolioUrl}`,
        `Specialties: ${specialties}`,
        `Message: ${message}`,
        '',
        `Submitted: ${new Date().toLocaleString()}`
      ].join('\n')
    } else {
      const name = safeString(data.name)
      const email = safeString(data.email)
      const subject = safeString(data.subject)
      const message = safeString(data.message)

      return [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
        '',
        `Submitted: ${new Date().toLocaleString()}`
      ].join('\n')
    }
  }
}
