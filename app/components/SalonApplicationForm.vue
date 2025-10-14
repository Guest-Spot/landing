<template>
  <section id="for-studios" data-cy="shop-application-form" class="shop-application-form">
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
            <!-- Application Type -->
            <div class="form-section">
              <h3 class="section-title">Application Type</h3>

              <ApplicationTypeSelect
                v-model="formData.type"
                :error="errors.type"
                :disabled="isSubmitting"
              />
            </div>

            <template v-if="isShop">
              <!-- Business Information -->
              <div class="form-section">
                <h3 class="section-title">Business Information</h3>

                <div class="form-row">
                  <div class="custom-input">
                    <input
                      data-cy="business-name"
                      v-model="formData.name"
                      type="text"
                      placeholder="Business Name *"
                      required
                    />
                    <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
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
                      inputmode="tel"
                      placeholder="Phone Number (e.g. 123-456-7890)"
                      @input="onPhoneInput"
                      @paste="onPhonePaste"
                      @blur="onPhoneBlur"
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

                <div class="custom-input full-width">
                  <input
                    data-cy="city"
                    v-model="formData.city"
                    type="text"
                    placeholder="City *"
                    required
                  />
                  <span v-if="errors.city" class="form-error">{{ errors.city }}</span>
                </div>
              </div>

              <!-- Services & Experience -->
              <div class="form-section">
                <h3 class="section-title">Experience</h3>

                <div class="form-row">
                  <div class="custom-input">
                    <input
                      data-cy="experience"
                      v-model="formData.experience"
                      type="number"
                      placeholder="Years of Founded *"
                      required
                    />
                    <span v-if="errors.experience" class="form-error">{{ errors.experience }}</span>
                    <span class="form-help">When was your business founded?</span>
                  </div>
                  <div class="custom-input">
                    <input
                      v-model="formData.link"
                      type="url"
                      placeholder="Portfolio/Website URL"
                    />
                  </div>
                </div>
              </div>

              <!-- Additional Information -->
              <div class="form-section">
                <h3 class="section-title">Additional Information</h3>

                <div class="custom-input full-width">
                  <textarea
                    data-cy="message"
                    v-model="formData.description"
                    placeholder="Tell us about your studio"
                    rows="4"
                  ></textarea>
                  <span class="form-help">Optional: Share any additional information about your studio, specialties, or what makes you unique</span>
                </div>
              </div>
            </template>

            <template v-else-if="isArtist">
              <!-- Artist Information -->
              <div class="form-section">
                <h3 class="section-title">Artist Information</h3>

                <div class="custom-input">
                  <input
                    data-cy="business-name"
                    v-model="formData.name"
                    type="text"
                    placeholder="Artist Name *"
                    required
                  />
                  <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
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
                      inputmode="tel"
                      placeholder="Phone Number (e.g. 123-456-7890)"
                      @input="onPhoneInput"
                      @paste="onPhonePaste"
                      @blur="onPhoneBlur"
                    />
                  </div>
                </div>
              </div>

              <!-- Location Information -->
              <div class="form-section">
                <h3 class="section-title">Location</h3>

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
                      data-cy="address"
                      v-model="formData.address"
                      type="text"
                      placeholder="Studio Address (Optional)"
                    />
                    <span v-if="errors.address" class="form-error">{{ errors.address }}</span>
                    <span class="form-help">Optional: minimum 5 characters if provided</span>
                  </div>
                </div>
              </div>

              <!-- Experience & Portfolio -->
              <div class="form-section">
                <h3 class="section-title">Experience</h3>

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
                    <span class="form-help">Minimum 1 year of experience</span>
                  </div>
                  <div class="custom-input">
                    <input
                      v-model="formData.link"
                      type="url"
                      placeholder="Portfolio or Instagram URL *"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Additional Information -->
              <div class="form-section">
                <h3 class="section-title">Additional Information</h3>

                <div class="custom-input full-width">
                  <textarea
                    data-cy="message"
                    v-model="formData.description"
                    placeholder="Tell us about your style, specialties, and recent guest spots"
                    rows="4"
                  ></textarea>
                  <span class="form-help">Optional: Share highlights about your tattoo style, availability, or upcoming travel plans</span>
                </div>
              </div>
            </template>

            <div v-else class="form-section">
              <p class="form-placeholder">
                Select an application type to see the relevant form fields.
              </p>
            </div>
          </div>

          <!-- Submit Section -->
          <div class="submit-section">
            <button
              data-cy="submit-button"
              type="submit"
              :disabled="isSubmitting || isRecaptchaLoading"
              class="submit-button btn btn-primary btn-xl"
            >
              <span v-if="isSubmitting" class="loading-spinner"></span>
              {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
            </button>
            <span v-if="recaptchaError" class="form-error">{{ recaptchaError }}</span>

            <p class="submit-note">
              By submitting this form, you agree to our
              <router-link to="/terms-of-service" class="link">Terms of Service</router-link>
              and
              <router-link to="/user-agreement" class="link">User Agreement</router-link>.
            </p>
          </div>
        </form>

      </div>
    </div>
    <AlertToast
      :visible="alertState.visible"
      :type="alertState.type"
      :message="alertState.text"
      @close="hideAlert"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
import ApplicationTypeSelect from './ApplicationTypeSelect.vue'
import AlertToast from './AlertToast.vue'
import { FormService } from '../services/formService'
import { usePhoneMask } from '../composables/usePhoneMask'
import type { ApplicantType, IShopApplication } from '../models/SalonApplication.js'

interface ApplicationFormData {
  type: ApplicantType | ''
  name: string
  contactName: string
  email: string
  phone: string
  address: string
  city: string
  experience: string
  link: string
  description: string
}

interface FormErrors {
  type: string
  name: string
  contactName: string
  email: string
  address: string
  city: string
  experience: string
  description: string
}

const formService = new FormService()
const isSubmitting = ref(false)
const { executeRecaptcha, recaptchaError, isRecaptchaLoading } = useRecaptcha()
const { phoneValue, applyPhoneMask, onPhoneInput, onPhonePaste, onPhoneBlur } = usePhoneMask()
const alertState = reactive({
  visible: false,
  type: 'success' as 'success' | 'error',
  text: ''
})
const DUPLICATE_EMAIL_MESSAGE = 'Email already registered'

let alertTimer: ReturnType<typeof setTimeout> | null = null
let clearMessageTimer: ReturnType<typeof setTimeout> | null = null
let emailCheckTimer: ReturnType<typeof setTimeout> | null = null
let emailCheckAbortController: AbortController | null = null
const emailExists = ref(false)

const hideAlert = () => {
  alertState.visible = false

  if (alertTimer) {
    clearTimeout(alertTimer)
    alertTimer = null
  }

  if (clearMessageTimer) {
    clearTimeout(clearMessageTimer)
  }

  clearMessageTimer = setTimeout(() => {
    alertState.text = ''
    clearMessageTimer = null
  }, 250)
}

const showAlert = (type: 'success' | 'error', text: string) => {
  if (alertTimer) {
    clearTimeout(alertTimer)
  }
  if (clearMessageTimer) {
    clearTimeout(clearMessageTimer)
    clearMessageTimer = null
  }

  alertState.type = type
  alertState.text = text
  alertState.visible = true

  alertTimer = setTimeout(() => {
    hideAlert()
  }, 3000)
}

onBeforeUnmount(() => {
  if (alertTimer) {
    clearTimeout(alertTimer)
  }
  if (clearMessageTimer) {
    clearTimeout(clearMessageTimer)
  }
  if (emailCheckTimer) {
    clearTimeout(emailCheckTimer)
  }
  if (emailCheckAbortController) {
    emailCheckAbortController.abort()
  }
})

const createInitialFormData = (): ApplicationFormData => ({
  type: '',
  name: '',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  experience: '',
  link: '',
  description: ''
})

const formData = reactive<ApplicationFormData>(createInitialFormData())

const errors = reactive<FormErrors>({
  type: '',
  name: '',
  contactName: '',
  email: '',
  address: '',
  city: '',
  experience: '',
  description: ''
})

const resetErrors = () => {
  ;(Object.keys(errors) as Array<keyof FormErrors>).forEach(key => {
    errors[key] = ''
  })
}

const resetForm = () => {
  Object.assign(formData, createInitialFormData())
  phoneValue.value = ''
  resetErrors()
}

const isShop = computed(() => formData.type === 'shop')
const isArtist = computed(() => formData.type === 'artist')

// Sync phoneValue with formData.phone
watch(phoneValue, (newValue: string) => {
  formData.phone = newValue
})

watch(
  () => formData.type,
  () => {
    resetErrors()
  }
)

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const clearDuplicateEmailError = () => {
  if (errors.email === DUPLICATE_EMAIL_MESSAGE) {
    errors.email = ''
  }
}

const checkEmailExistence = async (email: string) => {
  if (emailCheckAbortController) {
    emailCheckAbortController.abort()
  }

  const controller = new AbortController()
  emailCheckAbortController = controller

  try {
    const response = await $fetch<{ exists: boolean }>('/api/auth/email-exists', {
      method: 'GET',
      params: { email },
      signal: controller.signal
    })

    if (formData.email !== email) {
      return
    }

    emailExists.value = !!response.exists

    if (emailExists.value) {
      errors.email = DUPLICATE_EMAIL_MESSAGE
    } else {
      clearDuplicateEmailError()
    }
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Email existence check failed:', error)
    }
  } finally {
    if (emailCheckAbortController === controller) {
      emailCheckAbortController = null
    }
  }
}

watch(
  () => formData.email,
  newEmail => {
    emailExists.value = false

    if (emailCheckTimer) {
      clearTimeout(emailCheckTimer)
      emailCheckTimer = null
    }

    clearDuplicateEmailError()

    if (emailCheckAbortController) {
      emailCheckAbortController.abort()
      emailCheckAbortController = null
    }

    if (!newEmail || !isValidEmail(newEmail)) {
      return
    }

    emailCheckTimer = setTimeout(() => {
      checkEmailExistence(newEmail)
      emailCheckTimer = null
    }, 400)
  }
)

const validateForm = () => {
  // Reset errors
  resetErrors()

  let isValid = true

  if (!formData.type) {
    errors.type = 'Please select the application type'
    isValid = false
  }

  // Validate name
  if (!formData.name) {
    errors.name = formData.type === 'artist' ? 'Artist name is required' : 'Business name is required'
    isValid = false
  }

  // Validate contact name
  if (!formData.contactName && formData.type === 'shop') {
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
  } else if (emailExists.value) {
    errors.email = DUPLICATE_EMAIL_MESSAGE
    isValid = false
  }

  if (formData.type === 'shop') {
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
  } else if (formData.type === 'artist') {
    // Validate city for artist
    if (!formData.city) {
      errors.city = 'City is required'
      isValid = false
    }

    // Optional address validation
    if (formData.address && formData.address.length < 5) {
      errors.address = 'Address should be at least 5 characters'
      isValid = false
    }
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

const onSubmit = async () => {
  if (formData.email && isValidEmail(formData.email)) {
    await checkEmailExistence(formData.email)
  }

  if (!validateForm()) {
    return
  }

  const action = formData.type === 'artist' ? 'artist_application' : 'shop_application'
  const recaptchaToken = await executeRecaptcha(action)

  if (!recaptchaToken) {
    if (!recaptchaError.value) {
      recaptchaError.value = 'Please complete the reCAPTCHA verification.'
    }
    return
  }

  isSubmitting.value = true

  try {
    const submissionPayload: Partial<IShopApplication> & { recaptchaToken: string } = {
      ...formData,
      type: formData.type as ApplicantType,
      recaptchaToken
    }
    const result = await formService.submitShopApplication(submissionPayload)

    if (result.success) {
      const submittedType = formData.type
      showAlert('success', result.message)
      resetForm()

      // Track successful submission
      if ((window as any).gtag) {
        const trackingEvent =
          submittedType === 'artist'
            ? 'artist_application_submitted'
            : 'shop_application_submitted'
        const eventLabel =
          submittedType === 'artist' ? 'artist_application' : 'shop_application'

        ;(window as any).gtag('event', trackingEvent, {
          event_category: 'form_submission',
          event_label: eventLabel
        })
      }
    } else {
      showAlert('error', result.message)
    }
  } catch (error) {
    console.error('Form submission error:', error)
    showAlert('error', 'An error occurred. Please try again later.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.shop-application-form {
  padding: 6rem 0;
  background: #000;
  position: relative;
}

.shop-application-form::before {
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
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ff3d00;
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

.form-placeholder {
  color: #b3b3b3;
  font-size: 1rem;
  margin: 0;
}

.submit-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
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
  .form-container {
    padding: 1.5rem 1rem;
  }

  .form-title {
    font-size: 1.75rem;
  }
}
</style>
