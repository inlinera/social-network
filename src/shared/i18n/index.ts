import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { ru } from './locales/ru'
import { en } from './locales/en'
import { ISettings } from '../store/functional/start-app'

const settings = localStorage.getItem('2la-settings')

const { lang }: Pick<ISettings, 'lang'> = settings ? JSON.parse(settings) : 'en'

const resources = { ru, en }

i18n.use(initReactI18next).init({
  resources,
  lng: lang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})
