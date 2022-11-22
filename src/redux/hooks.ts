import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux'
import { AppDispatch, RootState } from './store'

// 自定义Hook
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export const useDispatch = () => useReduxDispatch<AppDispatch>()
