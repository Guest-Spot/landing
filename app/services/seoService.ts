export interface IMetaData {
  title: string
  description: string
  keywords: string
  image: string
  url: string
  siteName: string
}

export interface IFAQ {
  question: string
  answer: string
}

export interface IAnalyticsEvent {
  [key: string]: unknown
}

// Extend Window interface to include ym
declare global {
  interface Window {
    ym: (id: string | number, command: string, config?: unknown) => void
  }
}

export class SEOService {
  defaultMeta: IMetaData

  constructor() {
    this.defaultMeta = {
      title: 'GuestSpot - Find Your Perfect Tattoo Studio',
      description: 'Discover the best tattoo studios and artists in your area. Book appointments, view portfolios, and find your perfect tattoo experience.',
      keywords: 'tattoo, tattoo studio, tattoo artist, body art, piercing, tattoo appointment, tattoo finder',
      image: '/og-image.jpg',
      url: 'https://guestspot.app',
      siteName: 'GuestSpot'
    }
  }

  setPageMeta(meta: Partial<IMetaData> = {}): void {
    const pageMeta = { ...this.defaultMeta, ...meta }

    // Set title
    document.title = pageMeta.title

    // Set meta description
    this.setMetaTag('name', 'description', pageMeta.description)
    this.setMetaTag('name', 'keywords', pageMeta.keywords)

    // Set Open Graph tags
    this.setMetaTag('property', 'og:title', pageMeta.title)
    this.setMetaTag('property', 'og:description', pageMeta.description)
    this.setMetaTag('property', 'og:image', pageMeta.image)
    this.setMetaTag('property', 'og:url', pageMeta.url)
    this.setMetaTag('property', 'og:site_name', pageMeta.siteName)
    this.setMetaTag('property', 'og:type', 'website')

    // Set Twitter Card tags
    this.setMetaTag('name', 'twitter:card', 'summary_large_image')
    this.setMetaTag('name', 'twitter:title', pageMeta.title)
    this.setMetaTag('name', 'twitter:description', pageMeta.description)
    this.setMetaTag('name', 'twitter:image', pageMeta.image)

    // Set canonical URL
    this.setCanonicalUrl(pageMeta.url)
  }

  setMetaTag(attribute: string, name: string, content: string): void {
    let element = document.querySelector(`meta[${attribute}="${name}"]`)

    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, name)
      document.head.appendChild(element)
    }

    element.setAttribute('content', content)
  }

  setCanonicalUrl(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]')

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }

    canonical.setAttribute('href', url)
  }

  addStructuredData(data: Record<string, unknown>): void {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }

  setLegalDocumentMeta(documentType: string, title: string): void {
    const meta = {
      title: `${title} - GuestSpot`,
      description: `Read our ${title.toLowerCase()} to understand how we handle your data and our service terms.`,
      url: `${this.defaultMeta.url}/${documentType}`
    }

    this.setPageMeta(meta)
  }

  // Structured data for business
  addBusinessStructuredData() {
    const businessData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'GuestSpot',
      'description': 'Platform for finding and booking tattoo studios and artists',
      'url': 'https://guestspot.app',
      'logo': 'https://guestspot.app/logo.png',
      'sameAs': [
        'https://www.facebook.com/guestspot',
        'https://www.instagram.com/guestspot',
        'https://twitter.com/guestspot'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-800-GUEST-SPOT',
        'contactType': 'customer service',
        'availableLanguage': ['English', 'Russian']
      }
    }

    this.addStructuredData(businessData)
  }

  // Structured data for software application
  addSoftwareApplicationStructuredData() {
    const appData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'GuestSpot',
      'description': 'Mobile app for finding and booking tattoo studios',
      'applicationCategory': 'LifestyleApplication',
      'operatingSystem': ['iOS', 'Android'],
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'downloadUrl': 'https://apps.apple.com/app/guestspot',
      'screenshot': 'https://guestspot.app/app-screenshot.jpg'
    }

    this.addStructuredData(appData)
  }

  // Structured data for FAQ section
  addFAQStructuredData(faqs: IFAQ[]): void {
    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    }

    this.addStructuredData(faqData)
  }

  // Performance optimization
  preloadCriticalResources() {
    const criticalResources = [
      { href: '/fonts/inter-variable.woff2', as: 'font', type: 'font/woff2' },
      { href: '/css/critical.css', as: 'style' },
      { href: '/hero-image.webp', as: 'image' }
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource.href
      link.as = resource.as
      if (resource.type) link.type = resource.type
      if (resource.as === 'font') link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }

  // Load analytics
  loadAnalytics() {
    // Google Analytics (if GA_ID is provided)
    const gaId = process.env.GA_ID
    if (gaId) {
      this.loadGoogleAnalytics(gaId)
    }

    // Yandex Metrica (if YM_ID is provided)
    const ymId = process.env.YM_ID
    if (ymId) {
      this.loadYandexMetrica(ymId)
    }
  }

  loadGoogleAnalytics(gaId: string): void {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `
    document.head.appendChild(script2)
  }

  loadYandexMetrica(ymId: string): void {
    const script = document.createElement('script')
    script.textContent = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(${ymId}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      });
    `
    document.head.appendChild(script)
  }

  // Track events
  trackEvent(eventName: string, parameters: IAnalyticsEvent = {}): void {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, parameters)
    }

    // Yandex Metrica
    if (window.ym) {
      window.ym('reachGoal', eventName, parameters)
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, parameters)
    }
  }
}
