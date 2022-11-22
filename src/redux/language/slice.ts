import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LanguageState {
  lng: 'en' | 'zh'
  lngList: {
    name: string
    code: string
  }[]
}

const initialState: LanguageState = {
  lng: 'zh',
  lngList: [
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

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<'zh' | 'en'>) => {
      state.lng = action.payload
    },
    addLanguage: (
      state,
      action: PayloadAction<{
        name: string
        code: string
      }>
    ) => {
      state.lngList.push(action.payload)
    },
  },
})
