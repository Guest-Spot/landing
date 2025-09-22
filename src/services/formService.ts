import { ValidationService } from './validationService.js'

export class FormService {
  constructor() {
    this.apiEndpoint = process.env.FORM_ENDPOINT || 'https://formspree.io/f/your-form-id'
    this.emailEndpoint = process.env.EMAIL_ENDPOINT || null
  }

  async submitSalonApplication(data) {
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
      const response = await this.submitToFormService(submissionData, 'salon-application')

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
        error: error.message
      }
    }
  }

  async submitContactInquiry(data) {
    try {
      // Validate data first
      const validation = ValidationService.validateContactInquiry(data)
      if (!validation.isValid) {
        throw new Error('Validation failed: ' + validation.errors.join(', '))
      }

      // Sanitize input
      const sanitizedData = this.sanitizeFormData(data)

      // Prepare submission data
      const submissionData = {
        ...sanitizedData,
        formType: 'contact-inquiry',
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      }

      // Submit to form service
      const response = await this.submitToFormService(submissionData, 'contact')

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
        error: error.message
      }
    }
  }

  async submitToFormService(data, formType) {
    const endpoint = this.getEndpointForFormType(formType)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    return {
      ok: response.ok,
      status: response.status,
      data: result,
      id: result.id || null
    }
  }

  getEndpointForFormType(formType) {
    // In production, these would be different endpoints or include form IDs
    const endpoints = {
      'salon-application': process.env.SALON_FORM_ENDPOINT || this.apiEndpoint,
      'contact': process.env.CONTACT_FORM_ENDPOINT || this.apiEndpoint
    }

    return endpoints[formType] || this.apiEndpoint
  }

  sanitizeFormData(data) {
    const sanitized = {}

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

  generateSubmissionId() {
    return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Method to test form service availability
  async testFormService() {
    try {
      await fetch(this.apiEndpoint, {
        method: 'GET',
        mode: 'no-cors'
      })
      return true
    } catch (error) {
      console.warn('Form service test failed:', error)
      return false
    }
  }

  // Fallback email submission (opens user's email client)
  submitViaEmail(data, formType) {
    const subject = formType === 'salon-application'
      ? `Salon Application - ${data.businessName}`
      : `Contact Inquiry - ${data.subject}`

    const body = this.formatEmailBody(data, formType)
    const emailUrl = `mailto:info@guestspot.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.open(emailUrl)

    return {
      success: true,
      message: 'Email client opened. Please send the email to complete your submission.',
      fallback: true
    }
  }

  formatEmailBody(data, formType) {
    if (formType === 'salon-application') {
      return `
Business Name: ${data.businessName}
Contact Name: ${data.contactName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Address: ${data.address}
City: ${data.city}
State: ${data.state}
Zip Code: ${data.zipCode}
Country: ${data.country}
Services: ${Array.isArray(data.services) ? data.services.join(', ') : data.services}
Experience: ${data.experience} years
Portfolio URL: ${data.portfolioUrl || 'Not provided'}
Specialties: ${Array.isArray(data.specialties) ? data.specialties.join(', ') : data.specialties || 'Not provided'}
Message: ${data.message || 'No additional message'}

Submitted: ${new Date().toLocaleString()}
      `.trim()
    } else {
      return `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

Submitted: ${new Date().toLocaleString()}
      `.trim()
    }
  }
}
