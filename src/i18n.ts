import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './i18n/en.json'
import fr from './i18n/fr.json'

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

// eslint-disable-next-line import/no-default-export
export default i18n
