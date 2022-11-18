import { createStore, combineReducers } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'

// rootReducer 是一个约定俗成的变量名称，最好遵守！
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

export default store
