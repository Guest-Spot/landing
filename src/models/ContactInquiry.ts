export class ContactInquiry {
  constructor(data = {}) {
    this.id = data.id || this.generateId()
    this.name = data.name || ''
    this.email = data.email || ''
    this.subject = data.subject || ''
    this.message = data.message || ''
    this.submittedAt = data.submittedAt || new Date()
    this.status = data.status || 'new'
  }

  generateId() {
    return 'contact_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
      submittedAt: this.submittedAt,
      status: this.status
    }
  }

  validate() {
    const errors = []

    if (!this.name || this.name.length < 2) {
      errors.push('Name must be at least 2 characters')
    }
    if (this.name && this.name.length > 50) {
      errors.push('Name must be no more than 50 characters')
    }
    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email is required')
    }
    if (!this.subject || this.subject.length < 5) {
      errors.push('Subject must be at least 5 characters')
    }
    if (this.subject && this.subject.length > 100) {
      errors.push('Subject must be no more than 100 characters')
    }
    if (!this.message || this.message.length < 10) {
      errors.push('Message must be at least 10 characters')
    }
    if (this.message && this.message.length > 1000) {
      errors.push('Message must be no more than 1000 characters')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  submit() {
    this.status = 'submitted'
    this.submittedAt = new Date()
  }
}
