import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { changeLanguage } from './middlewares/changeLanguage'
import { actionLog } from './middlewares/actionLog'

import { languageSlice } from './language/slice'
import { productDetailSlice } from './productDetail/slice'
import { recommendProductsSlice } from './recommendProducts/recommendProductsSlice'

// rootReducer 是一个约定俗成的变量名称，最好遵守！
const rootReducer = combineReducers({
  language: languageSlice.reducer,
  recommendProducts: recommendProductsSlice.reducer,
  productDetail: productDetailSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(changeLanguage, actionLog),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
