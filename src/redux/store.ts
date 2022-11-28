import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// middlewares
import { changeLanguage } from './middlewares/changeLanguage'
import { actionLog } from './middlewares/actionLog'

// slices
import { languageSlice } from './language/slice'
import { productDetailSlice } from './productDetail/slice'
import { recommendProductsSlice } from './recommendProducts/slice'
import { productSearchSlice } from './productSearch/slice'
import { userSlice } from './user/slice'
import { shoppingCartSlice } from './shoppingCart/slice'
import { orderSlice } from './order/slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'user'],
}

const reducer = combineReducers({
  // 语言切换
  language: languageSlice.reducer,
  // 推荐产品
  recommendProducts: recommendProductsSlice.reducer,
  // 产品细节
  productDetail: productDetailSlice.reducer,
  // 搜索产品
  productSearch: productSearchSlice.reducer,
  // 登录
  user: userSlice.reducer,
  // 购物车
  shoppingCart: shoppingCartSlice.reducer,
  // 订单页面
  order: orderSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

// create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(changeLanguage, actionLog),
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor }
