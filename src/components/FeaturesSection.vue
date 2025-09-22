<template>
  <section data-cy="features-section" class="features-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Why Choose GuestSpot?</h2>
        <p class="section-subtitle">
          We make finding and booking your perfect tattoo experience effortless
        </p>
      </div>
      
      <div class="features-grid">
        <div 
          v-for="feature in features" 
          :key="feature.id"
          data-cy="feature-card"
          class="feature-card"
        >
          <div class="feature-icon">
            <q-icon :name="feature.icon" size="2.5rem" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <ul v-if="feature.benefits" class="feature-benefits">
            <li v-for="benefit in feature.benefits" :key="benefit">
              {{ benefit }}
            </li>
          </ul>
        </div>
      </div>
      
      <div class="cta-section">
        <h3 class="cta-title">Ready to Find Your Perfect Studio?</h3>
        <p class="cta-subtitle">Join thousands of satisfied customers</p>
        <q-btn
          data-cy="get-started-btn"
          class="cta-button"
          size="xl"
          color="accent"
          label="Get Started Now"
          icon="rocket_launch"
          @click="scrollToApplication"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FeaturesSection',
  data() {
    return {
      features: [
        {
          id: 1,
          icon: 'search',
          title: 'Smart Search',
          description: 'Find studios and artists based on your location, style preferences, and availability.',
          benefits: [
            'Advanced filtering options',
            'Real-time availability',
            'Style-based recommendations',
            'Distance-based sorting'
          ]
        },
        {
          id: 2,
          icon: 'photo_library',
          title: 'Portfolio Gallery',
          description: 'Browse thousands of high-quality portfolios to find the perfect artist for your vision.',
          benefits: [
            'High-resolution images',
            'Style categorization',
            'Before/after photos',
            'Artist specializations'
          ]
        },
        {
          id: 3,
          icon: 'event_available',
          title: 'Easy Booking',
          description: 'Book appointments directly through the app with real-time calendar integration.',
          benefits: [
            'Instant booking confirmation',
            'Calendar synchronization',
            'Reminder notifications',
            'Rescheduling options'
          ]
        },
        {
          id: 4,
          icon: 'star_rate',
          title: 'Verified Reviews',
          description: 'Read authentic reviews from real customers to make informed decisions.',
          benefits: [
            'Verified customer reviews',
            'Photo reviews included',
            'Rating breakdowns',
            'Recent feedback'
          ]
        },
        {
          id: 5,
          icon: 'security',
          title: 'Safe & Secure',
          description: 'All studios are verified and licensed. Your safety and satisfaction are our priority.',
          benefits: [
            'Licensed professionals only',
            'Health & safety compliance',
            'Secure payment processing',
            'Insurance coverage'
          ]
        },
        {
          id: 6,
          icon: 'support_agent',
          title: '24/7 Support',
          description: 'Get help whenever you need it with our dedicated customer support team.',
          benefits: [
            'Live chat support',
            'Phone assistance',
            'Email support',
            'FAQ database'
          ]
        }
      ]
    }
  },
  methods: {
    scrollToApplication() {
      const applicationSection = document.querySelector('[data-cy="salon-application-form"]')
      if (applicationSection) {
        applicationSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
})
</script>

<style scoped>
.features-section {
  padding: 6rem 0;
  background: #000;
  position: relative;
}

.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 70% 30%, rgba(255, 61, 0, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 30% 70%, rgba(255, 61, 0, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffffff, #b3b3b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #b3b3b3;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 61, 0, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 61, 0, 0.1);
}

.feature-icon {
  margin-bottom: 1.5rem;
  color: #ff3d00;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.feature-description {
  font-size: 1rem;
  color: #b3b3b3;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-benefits {
  list-style: none;
  padding: 0;
  text-align: left;
}

.feature-benefits li {
  color: #d3d3d3;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
}

.feature-benefits li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #ff3d00;
  font-weight: bold;
}

.cta-section {
  text-align: center;
  background: rgba(255, 61, 0, 0.05);
  border: 1px solid rgba(255, 61, 0, 0.2);
  border-radius: 20px;
  padding: 3rem 2rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.25rem;
  color: #b3b3b3;
  margin-bottom: 2rem;
}

.cta-button {
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

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 61, 0, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .features-section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .cta-section {
    padding: 2rem 1rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-subtitle {
    font-size: 1.1rem;
  }
  
  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .feature-card {
    padding: 1.25rem;
  }
  
  .cta-title {
    font-size: 1.75rem;
  }
}
</style>
