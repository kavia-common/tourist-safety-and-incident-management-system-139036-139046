'use strict';
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');

// Minimal, extendable translation resources
const resources = {
  en: {
    translation: {
      health_ok: 'Service is healthy',
      unauthorized: 'Unauthorized'
    }
  },
  es: {
    translation: {
      health_ok: 'El servicio está saludable',
      unauthorized: 'No autorizado'
    }
  },
  fr: {
    translation: {
      health_ok: 'Le service est sain',
      unauthorized: 'Non autorisé'
    }
  }
};

i18next.use(middleware.LanguageDetector).init({
  resources,
  fallbackLng: 'en',
  detection: {
    order: ['querystring', 'header'],
    caches: false
  },
  interpolation: {
    escapeValue: false
  }
});

module.exports = {
  i18next,
  i18nMiddleware: middleware.handle(i18next)
};
