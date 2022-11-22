import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface RecommendProductsState {
  loading: boolean
  productList: any[]
  error: null | string
}

const initialState: RecommendProductsState = {
  loading: true,
  productList: [],
  error: null,
}

export const getRecommendProducts = createAsyncThunk(
  'recommendProducts/getRecommendProducts',
  async () => {
    const { data } = await axios.get(
      'http://123.56.149.216:8080/api/productCollections'
    )
    return data
  }
)

export const recommendProductsSlice = createSlice({
  name: 'recommendProducts',
  initialState,
  reducers: {},
  extraReducers: {
    [getRecommendProducts.pending.type]: state => {
      state.loading = true
    },
    [getRecommendProducts.fulfilled.type]: (state, action) => {
      state.loading = false
      state.productList = action.payload
    },
    [getRecommendProducts.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
