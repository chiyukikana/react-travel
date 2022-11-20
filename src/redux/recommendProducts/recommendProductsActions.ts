import { ThunkAction } from 'redux-thunk'
import axios from 'axios'
import { RootState } from '../store'

// 正在调用推荐信息API
export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START'
// 推荐信息API调用成功
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  'FETCH_RECOMMEND_PRODUCTS_SUCCESS'
// 推荐信息API调用失败
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL'

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS
  payload: any
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL
  payload: any
}

export type RecommendProductActionTypes =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction

export const fetchRecommendProductStartActionCreator =
  (): FetchRecommendProductStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_START,
    }
  }

export const fetchRecommendProductSuccessActionCreator = (
  data
): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  }
}

export const fetchRecommendProductFailActionCreator = (
  error
): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error,
  }
}

export const getRecommendProductActionCreator =
  (): ThunkAction<void, RootState, null, RecommendProductActionTypes> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreator())
    try {
      const { data } = await axios.get(
        'http://123.56.149.216:8080/api/productCollections'
      )
      dispatch(fetchRecommendProductSuccessActionCreator(data))
    } catch (e) {
      if (e instanceof Error) {
        dispatch(fetchRecommendProductFailActionCreator(e.message))
      }
    }
  }
