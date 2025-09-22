export class LegalDocument {
  constructor(data = {}) {
    this.id = data.id || ''
    this.title = data.title || ''
    this.content = data.content || ''
    this.version = data.version || '1.0.0'
    this.lastUpdated = data.lastUpdated || new Date()
    this.effectiveDate = data.effectiveDate || new Date()
    this.language = data.language || 'en'
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      version: this.version,
      lastUpdated: this.lastUpdated,
      effectiveDate: this.effectiveDate,
      language: this.language
    }
  }

  validate() {
    const errors = []

    if (!this.id) {
      errors.push('Document ID is required')
    }
    if (!this.title || this.title.length < 3) {
      errors.push('Title must be at least 3 characters')
    }
    if (!this.content || this.content.length < 10) {
      errors.push('Content must be at least 10 characters')
    }
    if (!this.version || !this.isValidVersion(this.version)) {
      errors.push('Valid semantic version is required')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  isValidVersion(version) {
    const versionRegex = /^\d+\.\d+\.\d+$/
    return versionRegex.test(version)
  }

  updateContent(newContent) {
    this.content = newContent
    this.lastUpdated = new Date()
  }

  updateVersion(newVersion) {
    if (this.isValidVersion(newVersion)) {
      this.version = newVersion
      this.lastUpdated = new Date()
      return true
    }
    return false
  }
}
