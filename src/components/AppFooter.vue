<template>
  <footer data-cy="footer" class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <h3 class="brand-name">GuestSpot</h3>
            <p class="brand-description">
              Find your perfect tattoo studio and create unforgettable experiences.
            </p>
          </div>

          <div class="social-links">
            <h4 class="social-title">Follow Us</h4>
            <div class="social-buttons">
              <q-btn
                flat
                round
                color="white"
                icon="facebook"
                size="md"
                @click="openSocial('facebook')"
                aria-label="Follow us on Facebook"
              />
              <q-btn
                flat
                round
                color="white"
                icon="fab-instagram"
                size="md"
                @click="openSocial('instagram')"
                aria-label="Follow us on Instagram"
              />
              <q-btn
                flat
                round
                color="white"
                icon="fab-twitter"
                size="md"
                @click="openSocial('twitter')"
                aria-label="Follow us on Twitter"
              />
              <q-btn
                flat
                round
                color="white"
                icon="fab-youtube"
                size="md"
                @click="openSocial('youtube')"
                aria-label="Subscribe to our YouTube channel"
              />
            </div>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="section-title">For Studios</h4>
          <ul class="footer-links">
            <li><a href="#join" class="footer-link">Join Our Platform</a></li>
            <li><a href="#pricing" class="footer-link">Pricing</a></li>
            <li><a href="#features" class="footer-link">Features</a></li>
            <li><a href="#support" class="footer-link">Studio Support</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="section-title">For Customers</h4>
          <ul class="footer-links">
            <li><a href="#how-it-works" class="footer-link">How It Works</a></li>
            <li><a href="#find-studio" class="footer-link">Find a Studio</a></li>
            <li><a href="#book-appointment" class="footer-link">Book Appointment</a></li>
            <li><a href="#help" class="footer-link">Help Center</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="section-title">Company</h4>
          <ul class="footer-links">
            <li><a href="#about" class="footer-link">About Us</a></li>
            <li><a href="#careers" class="footer-link">Careers</a></li>
            <li><a href="#press" class="footer-link">Press</a></li>
            <li><a href="#contact" class="footer-link">Contact</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="section-title">Download App</h4>
          <div class="download-buttons">
            <q-btn
              class="download-btn"
              color="white"
              text-color="black"
              icon="apple"
              label="App Store"
              @click="downloadApp('ios')"
            />
            <q-btn
              class="download-btn"
              color="white"
              text-color="black"
              icon="android"
              label="Google Play"
              @click="downloadApp('android')"
            />
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-legal">
          <LegalDocuments />
        </div>

        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} GuestSpot. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LegalDocuments from './LegalDocuments.vue'

export default defineComponent({
  name: 'AppFooter',
  components: {
    LegalDocuments
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    openSocial(platform) {
      const urls = {
        facebook: 'https://facebook.com/guestspot',
        instagram: 'https://instagram.com/guestspot',
        twitter: 'https://twitter.com/guestspot',
        youtube: 'https://youtube.com/guestspot'
      }

      window.open(urls[platform], '_blank')

      // Track social click
      if (window.gtag) {
        window.gtag('event', 'social_click', {
          event_category: 'engagement',
          event_label: platform
        })
      }
    },

    downloadApp(platform) {
      const urls = {
        ios: 'https://apps.apple.com/app/guestspot',
        android: 'https://play.google.com/store/apps/details?id=com.guestspot.app'
      }

      window.open(urls[platform], '_blank')

      // Track download click
      if (window.gtag) {
        window.gtag('event', 'download_app_click', {
          event_category: 'engagement',
          event_label: platform
        })
      }
    }
  }
})
</script>

<style scoped>
.app-footer {
  background: #000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4rem 0 2rem;
  position: relative;
}

.app-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 61, 0, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-brand {
  margin-bottom: 1rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ffffff, #ff3d00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-description {
  color: #b3b3b3;
  line-height: 1.6;
  font-size: 0.95rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: #b3b3b3;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ff3d00;
}

.social-links {
  margin-top: 1rem;
}

.social-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.social-buttons {
  display: flex;
  gap: 0.5rem;
}

.download-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.download-btn {
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  font-weight: 500;
  text-transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-legal {
  flex: 1;
}

.footer-copyright {
  color: #666;
  font-size: 0.85rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }

  .footer-section:first-child {
    grid-column: 1 / -1;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-section:first-child {
    grid-column: 1 / -1;
  }

  .download-buttons {
    flex-direction: row;
    justify-content: center;
  }

  .download-btn {
    max-width: 150px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-section:first-child {
    grid-column: 1;
  }

  .download-buttons {
    flex-direction: column;
    align-items: center;
  }

  .download-btn {
    max-width: 200px;
  }

  .social-buttons {
    justify-content: center;
  }
}
</style>
