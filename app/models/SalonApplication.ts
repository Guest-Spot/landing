export interface ISocialMedia {
  instagram: string
  facebook: string
  website: string
}

export interface ISalonApplication {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  services: string[]
  portfolioUrl: string
  socialMedia: ISocialMedia
  experience: string
  specialties: string[]
  message: string
  submittedAt: Date
  status: string
}

export class SalonApplication implements ISalonApplication {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  services: string[]
  portfolioUrl: string
  socialMedia: ISocialMedia
  experience: string
  specialties: string[]
  message: string
  submittedAt: Date
  status: string

  constructor(data: Partial<ISalonApplication> = {}) {
    this.id = data.id || this.generateId()
    this.businessName = data.businessName || ''
    this.contactName = data.contactName || ''
    this.email = data.email || ''
    this.phone = data.phone || ''
    this.address = data.address || ''
    this.city = data.city || ''
    this.state = data.state || ''
    this.zipCode = data.zipCode || ''
    this.country = data.country || ''
    this.services = data.services || []
    this.portfolioUrl = data.portfolioUrl || ''
    this.socialMedia = data.socialMedia || {
      instagram: '',
      facebook: '',
      website: ''
    }
    this.experience = data.experience || ''
    this.specialties = data.specialties || []
    this.message = data.message || ''
    this.submittedAt = data.submittedAt || new Date()
    this.status = data.status || 'draft'
  }

  generateId() {
    return 'salon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  toJSON() {
    return {
      id: this.id,
      businessName: this.businessName,
      contactName: this.contactName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      country: this.country,
      services: this.services,
      portfolioUrl: this.portfolioUrl,
      socialMedia: this.socialMedia,
      experience: this.experience,
      specialties: this.specialties,
      message: this.message,
      submittedAt: this.submittedAt,
      status: this.status
    }
  }

  validate() {
    const errors = []

    if (!this.businessName || this.businessName.length < 2) {
      errors.push('Business name must be at least 2 characters')
    }
    if (!this.contactName || this.contactName.length < 2) {
      errors.push('Contact name must be at least 2 characters')
    }
    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email is required')
    }
    if (!this.address || this.address.length < 5) {
      errors.push('Address must be at least 5 characters')
    }
    if (!this.city || this.city.length < 2) {
      errors.push('City is required')
    }
    if (!this.state || this.state.length < 2) {
      errors.push('State is required')
    }
    if (!this.zipCode) {
      errors.push('Zip code is required')
    }
    if (!this.country || this.country.length < 2) {
      errors.push('Country is required')
    }
    if (!this.services || this.services.length === 0) {
      errors.push('At least one service must be selected')
    }
    if (!this.experience || isNaN(parseInt(this.experience))) {
      errors.push('Years of experience must be a number')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  submit() {
    this.status = 'submitted'
    this.submittedAt = new Date()
  }
}
