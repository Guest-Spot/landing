<template>
  <section data-cy="contact-form" class="contact-form">
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
            <q-icon name="email" class="info-icon" />
            <div>
              <div class="info-label">Email</div>
              <div class="info-value">support@guestspot.app</div>
            </div>
          </div>
          <div class="info-item">
            <q-icon name="phone" class="info-icon" />
            <div>
              <div class="info-label">Phone</div>
              <div class="info-value">+1 (800) GUEST-SPOT</div>
            </div>
          </div>
          <div class="info-item">
            <q-icon name="schedule" class="info-icon" />
            <div>
              <div class="info-label">Response Time</div>
              <div class="info-value">Within 24 hours</div>
            </div>
          </div>

          <div class="social-links">
            <h4 class="social-title">Follow Us</h4>
            <div class="social-buttons">
              <q-btn
                flat
                round
                color="white"
                icon="mdi-facebook"
                size="lg"
                @click="openSocial('facebook')"
              />
              <q-btn
                flat
                round
                color="white"
                icon="mdi-instagram"
                size="lg"
                @click="openSocial('instagram')"
              />
              <q-btn
                flat
                round
                color="white"
                icon="mdi-twitter"
                size="lg"
                @click="openSocial('twitter')"
              />
            </div>
          </div>
        </div>

        <div class="form-container">
          <q-form @submit="onSubmit" class="contact-form-element">
            <div class="form-row">
              <q-input
                data-cy="contact-name"
                v-model="formData.name"
                label="Your Name *"
                :rules="[val => !!val || 'Name is required', val => val.length >= 2 || 'Name must be at least 2 characters']"
                outlined
                class="form-input"
              />
              <q-input
                data-cy="contact-email"
                v-model="formData.email"
                label="Email Address *"
                type="email"
                :rules="[val => !!val || 'Email is required', val => isValidEmail(val) || 'Invalid email format']"
                outlined
                class="form-input"
              />
            </div>

            <q-input
              data-cy="subject"
              v-model="formData.subject"
              label="Subject *"
              :rules="[(val: string) => !!val || 'Subject is required', (val: string) => val.length >= 5 || 'Subject must be at least 5 characters']"
              outlined
              class="form-input full-width"
            />

            <q-input
              data-cy="contact-message"
              v-model="formData.message"
              label="Message *"
              type="textarea"
              rows="6"
              :rules="[
                (val: string) => !!val || 'Message is required',
                (val: string) => val.length >= 10 || 'Message must be at least 10 characters',
                (val: string) => val.length <= 1000 || 'Message must be no more than 1000 characters'
              ]"
              outlined
              class="form-input full-width"
              hint="Please provide as much detail as possible so we can help you better"
            />

            <div class="submit-section">
              <q-btn
                data-cy="submit-button"
                type="submit"
                :loading="isSubmitting"
                :disable="isSubmitting"
                class="submit-button"
                size="xl"
                color="accent"
                :label="isSubmitting ? 'Sending...' : 'Send Message'"
                icon="send"
              />

              <p class="submit-note">
                We'll get back to you within 24 hours. For urgent matters, please call us directly.
              </p>
            </div>
          </q-form>

          <!-- Success/Error Messages -->
          <div v-if="submitMessage" class="message-container">
            <q-banner
              :class="submitMessage.type === 'success' ? 'success-banner' : 'error-banner'"
              :icon="submitMessage.type === 'success' ? 'check_circle' : 'error'"
            >
              {{ submitMessage.text }}
            </q-banner>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { FormService } from '../services/formService.js'

const formService = new FormService()
const isSubmitting = ref(false)
const submitMessage = ref<{ type: string; text: string } | null>(null)

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const onSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = null

  try {
    const result = await formService.submitContactInquiry(formData)

    if (result.success) {
      submitMessage.value = {
        type: 'success',
        text: result.message
      }

      // Reset form
      Object.keys(formData).forEach(key => {
        (formData as any)[key] = ''
      })

      // Track successful submission
      if (window.gtag) {
        window.gtag('event', 'contact_form_submitted', {
          event_category: 'form_submission',
          event_label: 'contact_inquiry'
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

const openSocial = (platform: string) => {
  const urls: Record<string, string> = {
    facebook: 'https://facebook.com/guestspot',
    instagram: 'https://instagram.com/guestspot',
    twitter: 'https://twitter.com/guestspot'
  }

  window.open(urls[platform], '_blank')

  // Track social click
  if (window.gtag) {
    window.gtag('event', 'social_click', {
      event_category: 'engagement',
      event_label: platform
    })
  }
}
</script>

<style scoped>
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
  margin: 0 auto;
  padding: 0 2rem;
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
  gap: 4rem;
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
  border-bottom: 2px solid #ff3d00;
  display: inline-block;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
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
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.social-buttons {
  display: flex;
  gap: 1rem;
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

.form-input {
  width: 100%;
}

.full-width {
  grid-column: 1 / -1;
}

.submit-section {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.submit-button {
  background: linear-gradient(45deg, #ff3d00, #ff6b35) !important;
  border: none !important;
  font-weight: 600;
  padding: 1rem 3rem;
  border-radius: 12px;
  text-transform: none;
  font-size: 1.2rem;
  box-shadow: 0 8px 25px rgba(255, 61, 0, 0.3);
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 61, 0, 0.4);
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
  .container {
    padding: 0 1rem;
  }

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
