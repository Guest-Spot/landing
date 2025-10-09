export interface ISocialMedia {
  type: string
  value: string
}

export type ApplicantType = 'shop' | 'artist'

export interface IShopApplication {
  id: string
  type: ApplicantType
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
  type: ApplicantType
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
    this.type = (data.type as ApplicantType) || 'shop'
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
    const prefix = this.type === 'artist' ? 'artist_' : 'shop_'
    return prefix + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  validate() {
    const errors = []
    const isShop = this.type === 'shop'
    const isArtist = this.type === 'artist'

    if (!this.type || (!isShop && !isArtist)) {
      errors.push('Application type is required')
    }

    if (!this.name || this.name.length < 2) {
      errors.push(isArtist ? 'Artist name must be at least 2 characters' : 'Business name must be at least 2 characters')
    }

    if (!this.contactName && isShop) {
      errors.push('Contact name is required')
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email is required')
    }

    if (isShop) {
      if (!this.address || this.address.length < 5) {
        errors.push('Address must be at least 5 characters')
      }
    } else if (isArtist) {
      if (this.address && this.address.length < 5) {
        errors.push('If provided, address must be at least 5 characters')
      }
    }

    if (!this.city || this.city.length < 2) {
      errors.push('City is required')
    }

    const experienceValue = parseInt(this.experience, 10)

    if (!this.experience || Number.isNaN(experienceValue)) {
      errors.push('Years of experience must be a number')
    } else if (experienceValue <= 0) {
      errors.push('Years of experience must be greater than 0')
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
