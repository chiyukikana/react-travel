import { Middleware } from 'redux'
import i18next from 'i18next'
import { CHANGE_LANGUAGE } from '../language/languageActions'

export const changeLanguage: Middleware = store => next => action => {
  if (action.type === CHANGE_LANGUAGE) {
    // 使用中间件处理切换语言
    i18next.changeLanguage(action.payload)
  }
  next(action)
}
