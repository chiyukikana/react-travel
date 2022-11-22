import { Middleware } from 'redux'
import { languageSlice } from '../language/slice'
import i18next from 'i18next'

export const changeLanguage: Middleware = store => next => action => {
  // 判断中间件action是否为切换语言的action类型
  if (action.type === languageSlice.actions.changeLanguage.type) {
    // 使用中间件处理切换语言
    i18next.changeLanguage(action.payload)
  }
  next(action)
}
