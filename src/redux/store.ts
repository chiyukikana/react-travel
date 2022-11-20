import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import { actionLog } from './middlewares/actionLog'
import { changeLanguage } from './middlewares/changeLanguage'

// rootReducer 是一个约定俗成的变量名称，最好遵守！
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, changeLanguage, actionLog)
)

export type RootState = ReturnType<typeof store.getState>

export default store
