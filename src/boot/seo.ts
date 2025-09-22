import { defineBoot } from '#q-app/wrappers'

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

export default defineBoot(({ app, router }) => {
  // Track page views
  router.afterEach((to) => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: to.path
      })
    }
  })

  // Track form submissions
  app.config.globalProperties.$trackFormSubmission = (formType: string, success = true) => {
    if (window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: formType,
        value: success ? 1 : 0
      })
    }
  }

  // Track button clicks
  app.config.globalProperties.$trackButtonClick = (buttonName: string, location = 'unknown') => {
    if (window.gtag) {
      window.gtag('event', 'button_click', {
        event_category: 'engagement',
        event_label: buttonName,
        custom_parameter_location: location
      })
    }
  }

  // Track social media clicks
  app.config.globalProperties.$trackSocialClick = (platform: string) => {
    if (window.gtag) {
      window.gtag('event', 'social_click', {
        event_category: 'engagement',
        event_label: platform
      })
    }
  }

  // Track download attempts
  app.config.globalProperties.$trackDownload = (platform: string) => {
    if (window.gtag) {
      window.gtag('event', 'download_app_click', {
        event_category: 'engagement',
        event_label: platform
      })
    }
  }
})
