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
        <q-form @submit="onSubmit" class="application-form">
          <div class="form-grid">
            <!-- Business Information -->
            <div class="form-section">
              <h3 class="section-title">Business Information</h3>
              
              <div class="form-row">
                <q-input
                  data-cy="business-name"
                  v-model="formData.businessName"
                  label="Business Name *"
                  :rules="[val => !!val || 'Business name is required']"
                  outlined
                  class="form-input"
                />
                <q-input
                  data-cy="contact-name"
                  v-model="formData.contactName"
                  label="Contact Person *"
                  :rules="[val => !!val || 'Contact name is required']"
                  outlined
                  class="form-input"
                />
              </div>
              
              <div class="form-row">
                <q-input
                  data-cy="email"
                  v-model="formData.email"
                  label="Email Address *"
                  type="email"
                  :rules="[val => !!val || 'Email is required', val => isValidEmail(val) || 'Invalid email format']"
                  outlined
                  class="form-input"
                />
                <q-input
                  data-cy="phone"
                  v-model="formData.phone"
                  label="Phone Number"
                  outlined
                  class="form-input"
                />
              </div>
            </div>
            
            <!-- Address Information -->
            <div class="form-section">
              <h3 class="section-title">Address Information</h3>
              
              <q-input
                data-cy="address"
                v-model="formData.address"
                label="Street Address *"
                :rules="[val => !!val || 'Address is required']"
                outlined
                class="form-input full-width"
              />
              
              <div class="form-row">
                <q-input
                  data-cy="city"
                  v-model="formData.city"
                  label="City *"
                  :rules="[val => !!val || 'City is required']"
                  outlined
                  class="form-input"
                />
                <q-input
                  data-cy="state"
                  v-model="formData.state"
                  label="State/Province *"
                  :rules="[val => !!val || 'State is required']"
                  outlined
                  class="form-input"
                />
                <q-input
                  data-cy="zip-code"
                  v-model="formData.zipCode"
                  label="ZIP/Postal Code *"
                  :rules="[val => !!val || 'ZIP code is required']"
                  outlined
                  class="form-input"
                />
              </div>
              
              <q-input
                data-cy="country"
                v-model="formData.country"
                label="Country *"
                :rules="[val => !!val || 'Country is required']"
                outlined
                class="form-input full-width"
              />
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
                <q-input
                  data-cy="experience"
                  v-model="formData.experience"
                  label="Years of Experience *"
                  type="number"
                  :rules="[val => !!val || 'Experience is required', val => val > 0 || 'Must be greater than 0']"
                  outlined
                  class="form-input"
                />
                <q-input
                  v-model="formData.portfolioUrl"
                  label="Portfolio/Website URL"
                  outlined
                  class="form-input"
                />
              </div>
              
              <div class="specialties-section">
                <q-input
                  v-model="specialtiesInput"
                  label="Specialties (comma-separated)"
                  outlined
                  class="form-input full-width"
                  @blur="updateSpecialties"
                />
                <div v-if="formData.specialties.length > 0" class="specialties-tags">
                  <q-chip
                    v-for="specialty in formData.specialties"
                    :key="specialty"
                    removable
                    @remove="removeSpecialty(specialty)"
                    color="accent"
                    text-color="white"
                  >
                    {{ specialty }}
                  </q-chip>
                </div>
              </div>
            </div>
            
            <!-- Social Media -->
            <div class="form-section">
              <h3 class="section-title">Social Media & Online Presence</h3>
              
              <div class="form-row">
                <q-input
                  v-model="formData.socialMedia.instagram"
                  label="Instagram Handle"
                  outlined
                  class="form-input"
                />
                <q-input
                  v-model="formData.socialMedia.facebook"
                  label="Facebook Page"
                  outlined
                  class="form-input"
                />
              </div>
              
              <q-input
                v-model="formData.socialMedia.website"
                label="Website URL"
                outlined
                class="form-input full-width"
              />
            </div>
            
            <!-- Additional Information -->
            <div class="form-section">
              <h3 class="section-title">Additional Information</h3>
              
              <q-input
                data-cy="message"
                v-model="formData.message"
                label="Tell us about your studio"
                type="textarea"
                rows="4"
                outlined
                class="form-input full-width"
                hint="Optional: Share any additional information about your studio, specialties, or what makes you unique"
              />
            </div>
          </div>
          
          <!-- Submit Section -->
          <div class="submit-section">
            <q-btn
              data-cy="submit-button"
              type="submit"
              :loading="isSubmitting"
              :disable="isSubmitting"
              class="submit-button"
              size="xl"
              color="accent"
              :label="isSubmitting ? 'Submitting...' : 'Submit Application'"
              icon="send"
            />
            
            <p class="submit-note">
              By submitting this form, you agree to our 
              <router-link to="/terms" class="link">Terms of Service</router-link> 
              and 
              <router-link to="/privacy" class="link">Privacy Policy</router-link>.
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
  </section>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { FormService } from '../services/formService.js'

export default defineComponent({
  name: 'SalonApplicationForm',
  setup() {
    const formService = new FormService()
    const isSubmitting = ref(false)
    const submitMessage = ref(null)
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
      services: [],
      experience: '',
      portfolioUrl: '',
      socialMedia: {
        instagram: '',
        facebook: '',
        website: ''
      },
      specialties: [],
      message: ''
    })
    
    const availableServices = [
      { value: 'tattoo', label: 'Tattoo' },
      { value: 'piercing', label: 'Piercing' },
      { value: 'consultation', label: 'Consultation' },
      { value: 'coverup', label: 'Cover-up' },
      { value: 'touchup', label: 'Touch-up' },
      { value: 'design', label: 'Custom Design' }
    ]
    
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
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
    
    const removeSpecialty = (specialty) => {
      formData.specialties = formData.specialties.filter(s => s !== specialty)
    }
    
    const onSubmit = async () => {
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
              formData[key] = { instagram: '', facebook: '', website: '' }
            } else if (key === 'services' || key === 'specialties') {
              formData[key] = []
            } else {
              formData[key] = ''
            }
          })
          
          // Track successful submission
          if (window.gtag) {
            window.gtag('event', 'salon_application_submitted', {
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
    
    return {
      formData,
      availableServices,
      isSubmitting,
      submitMessage,
      specialtiesInput,
      isValidEmail,
      updateSpecialties,
      removeSpecialty,
      onSubmit
    }
  }
})
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

.form-input {
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
