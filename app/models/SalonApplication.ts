export interface ISocialMedia {
  type: string
  value: string
}

export interface IShopApplication {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  address: string
  city: string
  link: string
  experience: string
  description: string
}

export class SalonApplication implements IShopApplication {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  address: string
  city: string
  link: string
  experience: string
  description: string

  constructor(data: Partial<IShopApplication> = {}) {
    this.id = data.id || this.generateId()
    this.name = data.name || ''
    this.contactName = data.contactName || ''
    this.email = data.email || ''
    this.phone = data.phone || ''
    this.address = data.address || ''
    this.city = data.city || ''
    this.link = data.link || ''
    this.experience = data.experience || ''
    this.description = data.description || ''
  }

  generateId() {
    return 'salon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  validate() {
    const errors = []

    if (!this.name || this.name.length < 2) {
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
}
