<template>
  <div class="legal-documents">
    <div class="legal-links">
      <router-link
        data-cy="tos-link"
        to="/terms-of-service"
        class="legal-link"
        aria-label="Read our Terms of Service"
      >
        <i class="mdi mdi-file-document link-icon"></i>
        Terms of Service
      </router-link>

      <router-link
        data-cy="privacy-link"
        to="/privacy-policy"
        class="legal-link"
        aria-label="Read our Privacy Policy"
      >
        <i class="mdi mdi-shield-account link-icon"></i>
        Privacy Policy
      </router-link>
    </div>

    <div class="external-links">
      <a
        href="https://www.apple.com/legal/internet-services/terms/site.html"
        target="_blank"
        rel="noopener noreferrer"
        class="external-link"
        aria-label="Apple App Store Terms of Service"
      >
        <i class="mdi mdi-apple link-icon"></i>
        App Store Terms
      </a>

      <a
        href="https://play.google.com/about/play-terms/"
        target="_blank"
        rel="noopener noreferrer"
        class="external-link"
        aria-label="Google Play Store Terms of Service"
      >
        <i class="mdi mdi-android link-icon"></i>
        Play Store Terms
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this component
</script>

<style scoped>
.legal-documents {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.legal-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.legal-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b3b3b3;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
}

.legal-link:hover {
  color: #ff3d00;
  background: rgba(255, 61, 0, 0.1);
  border-color: rgba(255, 61, 0, 0.3);
  transform: translateY(-1px);
}

.external-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.external-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.01);
}

.external-link:hover {
  color: #999;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.link-icon {
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .legal-links,
  .external-links {
    flex-direction: column;
    gap: 0.75rem;
  }

  .legal-link,
  .external-link {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .legal-link {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }

  .external-link {
    font-size: 0.8rem;
    padding: 0.35rem 0.7rem;
  }
}
</style>
