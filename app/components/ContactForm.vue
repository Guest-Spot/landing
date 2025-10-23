<template>
  <section id="contact" data-cy="contact-form" class="contact-form">
    <div class="container">
      <div class="form-header">
        <h2 class="form-title">Get in Touch</h2>
        <p class="form-subtitle">
          Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
        </p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h3 class="info-title">Contact Information</h3>
          <div class="info-item">
            <i class="mdi mdi-email info-icon"></i>
            <div>
              <div class="info-label">Email</div>
              <div class="info-value">guestspot9@gmail.com</div>
            </div>
          </div>
          <div class="info-item no-margin-bottom">
            <i class="mdi mdi-clock info-icon"></i>
            <div>
              <div class="info-label">Response Time</div>
              <div class="info-value">Within 24 hours</div>
            </div>
          </div>

          <div class="social-links hidden">
            <h4 class="social-title">Follow Us</h4>
            <div class="social-buttons">
              <button
                class="btn btn-ghost btn-social"
                @click="openSocial('facebook')"
                aria-label="Follow us on Facebook"
              >
                <i class="mdi mdi-facebook"></i>
              </button>
              <button
                class="btn btn-ghost btn-social"
                @click="openSocial('instagram')"
                aria-label="Follow us on Instagram"
              >
                <i class="mdi mdi-instagram"></i>
              </button>
              <button
                class="btn btn-ghost btn-social"
                @click="openSocial('twitter')"
                aria-label="Follow us on Twitter"
              >
                <i class="mdi mdi-twitter"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="form-container">
          <form @submit.prevent="onSubmit" class="contact-form-element">
            <div class="form-row">
              <div class="custom-input">
                <input
                  data-cy="contact-name"
                  v-model="formData.name"
                  type="text"
                  placeholder="Your Name *"
                  required
                  minlength="2"
                />
                <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
                <span class="form-help">Minimum 2 characters</span>
              </div>
              <div class="custom-input">
                <input
                  data-cy="contact-email"
                  v-model="formData.email"
                  type="email"
                  placeholder="Email Address *"
                  required
                />
                <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
              </div>
            </div>

            <div class="custom-input full-width">
              <input
                data-cy="subject"
                v-model="formData.subject"
                type="text"
                placeholder="Subject *"
                required
                minlength="5"
              />
              <span v-if="errors.subject" class="form-error">{{ errors.subject }}</span>
              <span class="form-help">Minimum 5 characters</span>
            </div>

            <div class="custom-input full-width">
              <textarea
                data-cy="contact-message"
                v-model="formData.message"
                placeholder="Message *"
                rows="6"
                required
                minlength="10"
                maxlength="1000"
              ></textarea>
              <span v-if="errors.message" class="form-error">{{ errors.message }}</span>
              <span class="form-help">
                Please provide as much detail as possible (minimum 10 characters, maximum 1000)
              </span>
            </div>

            <div class="submit-section">
              <button
                data-cy="submit-button"
                type="submit"
                :disabled="isSubmitting || isRecaptchaLoading"
                class="submit-button btn btn-primary btn-xl"
              >
                <span v-if="isSubmitting" class="loading-spinner"></span>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
              <span v-if="recaptchaError" class="form-error">{{ recaptchaError }}</span>

              <p class="submit-note">
                We'll get back to you within 24 hours. For urgent matters, please call us directly.
              </p>
            </div>
          </form>

        </div>
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
import { ref, reactive, onBeforeUnmount } from 'vue'
import { FormService } from '../services/formService'
import AlertToast from './AlertToast.vue'

const formService = new FormService()
const isSubmitting = ref(false)
const { executeRecaptcha, recaptchaError, isRecaptchaLoading } = useRecaptcha()
const alertState = reactive({
  visible: false,
  type: 'success' as 'success' | 'error',
  text: ''
})

let alertTimer: ReturnType<typeof setTimeout> | null = null
let clearMessageTimer: ReturnType<typeof setTimeout> | null = null

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
})

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

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

  // Validate name
  if (!formData.name) {
    errors.name = 'Name is required'
    isValid = false
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
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

  // Validate subject
  if (!formData.subject) {
    errors.subject = 'Subject is required'
    isValid = false
  } else if (formData.subject.length < 5) {
    errors.subject = 'Subject must be at least 5 characters'
    isValid = false
  }

  // Validate message
  if (!formData.message) {
    errors.message = 'Message is required'
    isValid = false
  } else if (formData.message.length < 10) {
    errors.message = 'Message must be at least 10 characters'
    isValid = false
  } else if (formData.message.length > 1000) {
    errors.message = 'Message must be no more than 1000 characters'
    isValid = false
  }

  return isValid
}

const onSubmit = async () => {
  if (!validateForm()) {
    return
  }

  const recaptchaToken = await executeRecaptcha('contact_inquiry')

  if (!recaptchaToken) {
    if (!recaptchaError.value) {
      recaptchaError.value = 'Please complete the reCAPTCHA verification.'
    }
    return
  }

  isSubmitting.value = true

  try {
    const result = await formService.submitContactInquiry({
      ...formData,
      recaptchaToken
    })

    if (result.success) {
      showAlert('success', result.message)

      // Reset form
      Object.keys(formData).forEach(key => {
        (formData as Record<string, unknown>)[key] = ''
      })

      // Track successful submission
      if ((window as any).gtag) {
        (window as any).gtag('event', 'contact_form_submitted', {
          event_category: 'form_submission',
          event_label: 'contact_inquiry'
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

const openSocial = (platform: string) => {
  const urls: Record<string, string> = {
    facebook: 'https://facebook.com/guestspot',
    instagram: 'https://instagram.com/guestspot',
    twitter: 'https://twitter.com/guestspot'
  }

  window.open(urls[platform], '_blank')

  // Track social click
  if ((window as any).gtag) {
    (window as any).gtag('event', 'social_click', {
      event_category: 'engagement',
      event_label: platform
    })
  }
}
</script>

<style scoped lang="scss">
.contact-form {
  padding: 6rem 0;
  background: #000;
  position: relative;
}

.contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 61, 0, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 61, 0, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1000px;
  position: relative;
  z-index: 1;
}

.form-header {
  text-align: center;
  margin-bottom: 4rem;
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;
}

.contact-info {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.info-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ff3d00;
  display: inline-block;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.no-margin-bottom {
  margin-bottom: 0;
}

.info-icon {
  color: #ff3d00;
  font-size: 1.5rem;
}

.info-label {
  font-size: 0.9rem;
  color: #b3b3b3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 1.1rem;
  color: white;
  font-weight: 500;
}

.social-links {
  margin-top: 1rem;
}

.social-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.social-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-social {
  width: 40px;
  height: 40px;
  color: #b3b3b3;
  text-decoration: none;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
}

.btn-social:hover {
  background: rgba(255, 61, 0, 0.1);
  border-color: rgba(255, 61, 0, 0.3);
  transform: translateY(-1px);
  color: #ff3d00;
}

.form-container {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.contact-form-element {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .form-container {
    padding: 2rem 1.5rem;
  }

  .contact-info {
    padding: 1.5rem;
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

  .contact-info {
    padding: 1.25rem;
  }

  .form-title {
    font-size: 1.75rem;
  }

  .social-buttons {
    justify-content: center;
  }
}
</style>
