import {
  FETCH_RECOMMEND_PRODUCTS_FAIL,
  FETCH_RECOMMEND_PRODUCTS_START,
  FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  RecommendProductActionTypes,
} from './recommendProductsActions'

interface RecommendProductsState {
  productList: any[]
  loading: boolean
  error: null | string
}

const defaultState: RecommendProductsState = {
  productList: [],
  loading: true,
  error: null,
}

const recommendProductsReducer = (
  state = defaultState,
  action: RecommendProductActionTypes
) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      }
    case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      }
    case FETCH_RECOMMEND_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default recommendProductsReducer
