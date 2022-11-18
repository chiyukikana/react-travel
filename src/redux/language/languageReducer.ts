import {
  ADD_LANGUAGE,
  CHANGE_LANGUAGE,
  LanguageActionTypes,
} from './languageActions'
import i18next from 'i18next'

export interface LanguageState {
  language: 'en' | 'zh'
  languageList: { name: string; code: string }[]
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [
    {
      name: '中文',
      code: 'zh',
    },
    {
      name: 'English',
      code: 'en',
    },
  ],
}

const languageReducer = (state = defaultState, action: LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      // 切换语言，这样处理是不标准的，有副作用！使用中间件进行改进！！
      i18next.changeLanguage(action.payload)
      return {
        ...state,
        language: action.payload,
      }
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      }
    default:
      return state
  }
}

export default languageReducer
