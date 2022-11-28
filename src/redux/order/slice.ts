import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { checkout } from '../shoppingCart/slice'

interface OrderState {
  loading: boolean
  error: string | null
  currentOrder: any
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null,
}

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async ({ jwt, orderId }: { jwt: string; orderId: string }) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/orders/${orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    )
    return data
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  // RTK的reducers是把action+reducer结合在一起了，不需要写action了！
  // 每一个对象就是action，并且有action对应的处理函数
  // slice面对对象，不需要写switch语句
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: state => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.loading = false
      state.currentOrder = action.payload
      state.error = null
    },
    [placeOrder.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: state => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.loading = false
      state.currentOrder = action.payload
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
