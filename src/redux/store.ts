import { configureStore, combineReducers } from '@reduxjs/toolkit'

// middlewares
import { changeLanguage } from './middlewares/changeLanguage'
import { actionLog } from './middlewares/actionLog'

// slices
import { languageSlice } from './language/slice'
import { productDetailSlice } from './productDetail/slice'
import { recommendProductsSlice } from './recommendProducts/slice'
import { productSearchSlice } from './productSearch/slice'

const reducer = combineReducers({
  language: languageSlice.reducer,
  recommendProducts: recommendProductsSlice.reducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
})

// create store
const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(changeLanguage, actionLog),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
