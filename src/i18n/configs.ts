import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import translation_en from './en.json'
import translation_zh from './zh.json'

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: 'zh',
  interpolation: {
    // 防止字符串xss注入，但是React已经自带了防注入机制，所以这里不再需要打开了。
    escapeValue: false,
  },
})
