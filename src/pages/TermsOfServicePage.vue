<template>
  <div class="terms-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Terms of Service</h1>
        <p class="page-subtitle">Last updated: {{ lastUpdated }}</p>
      </div>
    </div>

    <div class="page-content">
      <div class="container">
        <div class="legal-content">
          <section class="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using GuestSpot ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section class="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              GuestSpot is a platform that connects customers with tattoo studios and artists. We provide:
            </p>
            <ul>
              <li>Studio and artist discovery and search functionality</li>
              <li>Portfolio viewing and artist information</li>
              <li>Appointment booking services</li>
              <li>Review and rating system</li>
              <li>Customer support and assistance</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you may be required to create an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and up-to-date information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>4. Studio and Artist Listings</h2>
            <p>
              Studios and artists featured on our platform are responsible for:
            </p>
            <ul>
              <li>Maintaining accurate and current information</li>
              <li>Complying with all applicable health and safety regulations</li>
              <li>Providing services as advertised</li>
              <li>Maintaining appropriate licenses and certifications</li>
            </ul>
            <p>
              GuestSpot does not guarantee the quality, safety, or legality of services provided by listed studios and artists.
            </p>
          </section>

          <section class="legal-section">
            <h2>5. Booking and Payments</h2>
            <p>
              When booking appointments through our platform:
            </p>
            <ul>
              <li>All payments are processed securely through our payment partners</li>
              <li>Booking confirmations are subject to studio availability</li>
              <li>Cancellation policies vary by studio and are clearly displayed</li>
              <li>Refunds are subject to the individual studio's policies</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>6. User Content and Reviews</h2>
            <p>
              By submitting content (reviews, photos, comments) to our platform, you grant us a non-exclusive, royalty-free license to use, modify, and display such content. You agree that your content:
            </p>
            <ul>
              <li>Is accurate and truthful</li>
              <li>Does not violate any third-party rights</li>
              <li>Is not defamatory, offensive, or inappropriate</li>
              <li>Complies with our community guidelines</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>7. Prohibited Uses</h2>
            <p>You may not use our Service:</p>
            <ul>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>8. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
            </p>
          </section>

          <section class="legal-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall GuestSpot, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
          </section>

          <section class="legal-section">
            <h2>10. Disclaimer</h2>
            <p>
              The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
            </p>
            <ul>
              <li>Excludes all representations and warranties relating to this Service and its contents</li>
              <li>Excludes all liability for damages arising out of or in connection with your use of this Service</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section class="legal-section">
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section class="legal-section">
            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div class="contact-info">
              <p><strong>Email:</strong> legal@guestspot.app</p>
              <p><strong>Phone:</strong> +1 (800) GUEST-SPOT</p>
              <p><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TermsOfServicePage',
  data() {
    return {
      lastUpdated: 'December 19, 2024'
    }
  },
  mounted() {
    // Set page title and meta
    document.title = 'Terms of Service - GuestSpot'

    // Track page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Terms of Service',
        page_location: window.location.href
      })
    }
  }
})
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
  background: #000;
  color: white;
}

.page-header {
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  padding: 6rem 0 4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #b3b3b3;
  text-align: center;
}

.page-content {
  padding: 4rem 0;
}

.legal-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.legal-section {
  margin-bottom: 3rem;
}

.legal-section:last-child {
  margin-bottom: 0;
}

.legal-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ff3d00;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 61, 0, 0.3);
}

.legal-section p {
  font-size: 1rem;
  line-height: 1.7;
  color: #d3d3d3;
  margin-bottom: 1rem;
}

.legal-section ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.legal-section li {
  font-size: 1rem;
  line-height: 1.7;
  color: #d3d3d3;
  margin-bottom: 0.5rem;
}

.contact-info {
  background: rgba(255, 61, 0, 0.05);
  border: 1px solid rgba(255, 61, 0, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.contact-info p {
  margin-bottom: 0.5rem;
  color: white;
}

.contact-info p:last-child {
  margin-bottom: 0;
}

/* Print styles */
@media print {
  .terms-page {
    background: white;
    color: black;
  }

  .page-header {
    background: white;
    border-bottom: 2px solid #000;
  }

  .page-title {
    color: black;
  }

  .page-subtitle {
    color: #666;
  }

  .legal-content {
    background: white;
    border: 1px solid #000;
  }

  .legal-section h2 {
    color: #000;
    border-bottom: 1px solid #000;
  }

  .legal-section p,
  .legal-section li {
    color: #000;
  }

  .contact-info {
    background: #f5f5f5;
    border: 1px solid #000;
  }

  .contact-info p {
    color: #000;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .legal-content {
    padding: 2rem 1.5rem;
  }

  .legal-section h2 {
    font-size: 1.3rem;
  }

  .legal-section p,
  .legal-section li {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .legal-content {
    padding: 1.5rem 1rem;
  }

  .page-header {
    padding: 4rem 0 2rem;
  }

  .page-content {
    padding: 2rem 0;
  }
}
</style>
