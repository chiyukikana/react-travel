import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux'
import { AppDispatch, RootState } from './store'

// 拿到store中所有reducers的类型
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

// 让dispatch能接受异步thunk处理的类型
export const useDispatch = () => useReduxDispatch<AppDispatch>()
