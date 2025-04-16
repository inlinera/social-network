import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { ru } from './locales/ru'
import { en } from './locales/en'

const resources = { ru, en }

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
})
