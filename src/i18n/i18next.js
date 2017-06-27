import i18next from 'i18next'
import Cache from 'i18next-localstorage-cache'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en'
import fi from './locales/fi'

const options = {
  resources: { en, fi },
}

export default i18next
  .use(Cache)
  .use(LanguageDetector)
  .init(options, (err, t) => {
    if (err) return console.error('i18n failed: ', err)
  })
