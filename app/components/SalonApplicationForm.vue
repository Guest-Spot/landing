<template>
  <section data-cy="salon-application-form" class="salon-application-form">
    <div class="container">
      <div class="form-header">
        <h2 class="form-title">Join Our Platform</h2>
        <p class="form-subtitle">
          Apply to be featured on GuestSpot and reach thousands of potential customers
        </p>
      </div>

      <div class="form-container">
        <form @submit.prevent="onSubmit" class="application-form">
          <div class="form-grid">
            <!-- Business Information -->
            <div class="form-section">
              <h3 class="section-title">Business Information</h3>

              <div class="form-row">
                <div class="custom-input">
                  <input
                    data-cy="business-name"
                    v-model="formData.businessName"
                    type="text"
                    placeholder="Business Name *"
                    required
                  />
                  <span v-if="errors.businessName" class="form-error">{{ errors.businessName }}</span>
                </div>
                <div class="custom-input">
                  <input
                    data-cy="contact-name"
                    v-model="formData.contactName"
                    type="text"
                    placeholder="Contact Person *"
                    required
                  />
                  <span v-if="errors.contactName" class="form-error">{{ errors.contactName }}</span>
                </div>
              </div>

              <div class="form-row">
                <div class="custom-input">
                  <input
                    data-cy="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="Email Address *"
                    required
                  />
                  <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
                </div>
                <div class="custom-input">
                  <input
                    data-cy="phone"
                    v-model="formData.phone"
                    type="tel"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>

            <!-- Address Information -->
            <div class="form-section">
              <h3 class="section-title">Address Information</h3>

              <div class="custom-input full-width">
                <input
                  data-cy="address"
                  v-model="formData.address"
                  type="text"
                  placeholder="Street Address *"
                  required
                />
                <span v-if="errors.address" class="form-error">{{ errors.address }}</span>
              </div>

              <div class="form-row">
                <div class="custom-input">
                  <input
                    data-cy="city"
                    v-model="formData.city"
                    type="text"
                    placeholder="City *"
                    required
                  />
                  <span v-if="errors.city" class="form-error">{{ errors.city }}</span>
                </div>
                <div class="custom-input">
                  <input
                    data-cy="state"
                    v-model="formData.state"
                    type="text"
                    placeholder="State/Province *"
                    required
                  />
                  <span v-if="errors.state" class="form-error">{{ errors.state }}</span>
                </div>
                <div class="custom-input">
                  <input
                    data-cy="zip-code"
                    v-model="formData.zipCode"
                    type="text"
                    placeholder="ZIP/Postal Code *"
                    required
                  />
                  <span v-if="errors.zipCode" class="form-error">{{ errors.zipCode }}</span>
                </div>
              </div>

              <div class="custom-input full-width">
                <input
                  data-cy="country"
                  v-model="formData.country"
                  type="text"
                  placeholder="Country *"
                  required
                />
                <span v-if="errors.country" class="form-error">{{ errors.country }}</span>
              </div>
            </div>

            <!-- Services & Experience -->
            <div class="form-section">
              <h3 class="section-title">Services & Experience</h3>

              <div class="services-section">
                <label class="services-label">Services Offered *</label>
                <div class="services-grid">
                  <q-checkbox
                    v-for="service in availableServices"
                    :key="service.value"
                    :data-cy="`service-${service.value}`"
                    v-model="formData.services"
                    :val="service.value"
                    :label="service.label"
                    class="service-checkbox"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="custom-input">
                  <input
                    data-cy="experience"
                    v-model="formData.experience"
                    type="number"
                    placeholder="Years of Experience *"
                    required
                    min="1"
                  />
                  <span v-if="errors.experience" class="form-error">{{ errors.experience }}</span>
                </div>
                <div class="custom-input">
                  <input
                    v-model="formData.portfolioUrl"
                    type="url"
                    placeholder="Portfolio/Website URL"
                  />
                </div>
              </div>

              <div class="specialties-section">
                <div class="custom-input full-width">
                  <input
                    v-model="specialtiesInput"
                    type="text"
                    placeholder="Specialties (comma-separated)"
                    @blur="updateSpecialties"
                  />
                </div>
                <div v-if="formData.specialties.length > 0" class="specialties-tags">
                  <span
                    v-for="specialty in formData.specialties"
                    :key="specialty"
                    class="badge badge-primary"
                    @click="removeSpecialty(specialty)"
                    style="cursor: pointer;"
                  >
                    {{ specialty }} ×
                  </span>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="form-section">
              <h3 class="section-title">Social Media & Online Presence</h3>

              <div class="form-row">
                <div class="custom-input">
                  <input
                    v-model="formData.socialMedia.instagram"
                    type="text"
                    placeholder="Instagram Handle"
                  />
                </div>
                <div class="custom-input">
                  <input
                    v-model="formData.socialMedia.facebook"
                    type="text"
                    placeholder="Facebook Page"
                  />
                </div>
              </div>

              <div class="custom-input full-width">
                <input
                  v-model="formData.socialMedia.website"
                  type="url"
                  placeholder="Website URL"
                />
              </div>
            </div>

            <!-- Additional Information -->
            <div class="form-section">
              <h3 class="section-title">Additional Information</h3>

              <div class="custom-input full-width">
                <textarea
                  data-cy="message"
                  v-model="formData.message"
                  placeholder="Tell us about your studio"
                  rows="4"
                ></textarea>
                <span class="form-help">Optional: Share any additional information about your studio, specialties, or what makes you unique</span>
              </div>
            </div>
          </div>

          <!-- Submit Section -->
          <div class="submit-section">
            <button
              data-cy="submit-button"
              type="submit"
              :disabled="isSubmitting"
              class="submit-button btn btn-primary btn-xl"
            >
              <span v-if="isSubmitting" class="loading-spinner"></span>
              {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
            </button>

            <p class="submit-note">
              By submitting this form, you agree to our
              <router-link to="/terms" class="link">Terms of Service</router-link>
              and
              <router-link to="/privacy" class="link">Privacy Policy</router-link>.
            </p>
          </div>
        </form>

        <!-- Success/Error Messages -->
        <div v-if="submitMessage" class="message-container">
          <div
            :class="submitMessage.type === 'success' ? 'alert alert-success' : 'alert alert-error'"
          >
            {{ submitMessage.text }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { FormService } from '../services/formService'

const formService = new FormService()
const isSubmitting = ref(false)
const submitMessage = ref<{ type: string; text: string } | null>(null)
const specialtiesInput = ref('')

const formData = reactive({
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  services: [] as string[],
  experience: '',
  portfolioUrl: '',
  socialMedia: {
    instagram: '',
    facebook: '',
    website: ''
  },
  specialties: [] as string[],
  message: ''
})

const errors = reactive({
  businessName: '',
  contactName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  experience: ''
})

const availableServices = [
  { value: 'tattoo', label: 'Tattoo' },
  { value: 'piercing', label: 'Piercing' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'coverup', label: 'Cover-up' },
  { value: 'touchup', label: 'Touch-up' },
  { value: 'design', label: 'Custom Design' }
]

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    (errors as Record<string, unknown>)[key] = ''
  })

  let isValid = true

  // Validate business name
  if (!formData.businessName) {
    errors.businessName = 'Business name is required'
    isValid = false
  }

  // Validate contact name
  if (!formData.contactName) {
    errors.contactName = 'Contact name is required'
    isValid = false
  }

  // Validate email
  if (!formData.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email format'
    isValid = false
  }

  // Validate address
  if (!formData.address) {
    errors.address = 'Address is required'
    isValid = false
  }

  // Validate city
  if (!formData.city) {
    errors.city = 'City is required'
    isValid = false
  }

  // Validate state
  if (!formData.state) {
    errors.state = 'State is required'
    isValid = false
  }

  // Validate zip code
  if (!formData.zipCode) {
    errors.zipCode = 'ZIP code is required'
    isValid = false
  }

  // Validate country
  if (!formData.country) {
    errors.country = 'Country is required'
    isValid = false
  }

  // Validate experience
  if (!formData.experience) {
    errors.experience = 'Experience is required'
    isValid = false
  } else if (Number(formData.experience) <= 0) {
    errors.experience = 'Must be greater than 0'
    isValid = false
  }

  return isValid
}

const updateSpecialties = () => {
  if (specialtiesInput.value.trim()) {
    const specialties = specialtiesInput.value
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)
    formData.specialties = [...new Set(specialties)]
    specialtiesInput.value = ''
  }
}

const removeSpecialty = (specialty: string) => {
  formData.specialties = formData.specialties.filter(s => s !== specialty)
}

const onSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitMessage.value = null

  try {
    const result = await formService.submitSalonApplication(formData)

    if (result.success) {
      submitMessage.value = {
        type: 'success',
        text: result.message
      }

      // Reset form
      Object.keys(formData).forEach(key => {
        if (key === 'socialMedia') {
          (formData as Record<string, unknown>)[key] = { instagram: '', facebook: '', website: '' }
        } else if (key === 'services' || key === 'specialties') {
          (formData as Record<string, unknown>)[key] = []
        } else {
          (formData as Record<string, unknown>)[key] = ''
        }
      })

      // Track successful submission
      if ((window as any).gtag) {
        (window as any).gtag('event', 'salon_application_submitted', {
          event_category: 'form_submission',
          event_label: 'salon_application'
        })
      }
    } else {
      submitMessage.value = {
        type: 'error',
        text: result.message
      }
    }
  } catch (error) {
    console.error('Form submission error:', error)
    submitMessage.value = {
      type: 'error',
      text: 'An error occurred. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.salon-application-form {
  padding: 6rem 0;
  background: #000;
  position: relative;
}

.salon-application-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 61, 0, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(255, 61, 0, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.form-header {
  text-align: center;
  margin-bottom: 3rem;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.form-subtitle {
  font-size: 1.25rem;
  color: #b3b3b3;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.form-container {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ff3d00;
  display: inline-block;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.custom-input {
  width: 100%;
}

.full-width {
  grid-column: 1 / -1;
}

.services-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.services-label {
  font-size: 1rem;
  font-weight: 500;
  color: white;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.service-checkbox {
  color: #b3b3b3;
}

.specialties-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.specialties-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.submit-section {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #ff3d00, #ff6b35);
  border: none;
  font-weight: 600;
  padding: 1rem 3rem;
  border-radius: 12px;
  text-transform: none;
  font-size: 1.2rem;
  box-shadow: 0 8px 25px rgba(255, 61, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  color: white;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 61, 0, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-note {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #b3b3b3;
}

.link {
  color: #ff3d00;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.message-container {
  margin-top: 2rem;
}

.success-banner {
  background: rgba(76, 175, 80, 0.1) !important;
  border: 1px solid rgba(76, 175, 80, 0.3) !important;
  color: #4caf50 !important;
}

.error-banner {
  background: rgba(244, 67, 54, 0.1) !important;
  border: 1px solid rgba(244, 67, 54, 0.3) !important;
  color: #f44336 !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .form-title {
    font-size: 2rem;
  }

  .form-subtitle {
    font-size: 1.1rem;
  }

  .submit-button {
    padding: 0.875rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .form-container {
    padding: 1.5rem 1rem;
  }

  .form-title {
    font-size: 1.75rem;
  }
}
</style>
