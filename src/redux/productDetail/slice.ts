import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ProductDetailState {
  loading: boolean
  data: any
  error: string | null
}

const initialState: ProductDetailState = {
  loading: true,
  data: null,
  error: null,
}

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (touristRouteId: string) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    )
    return data
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  // RTK的reducers是把action+reducer结合在一起了，不需要写action了！
  // 每一个对象就是action，并且有action对应的处理函数
  // slice面对对象，不需要写switch语句
  reducers: {},
  extraReducers: {
    [getProductDetail.pending.type]: state => {
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    },
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
