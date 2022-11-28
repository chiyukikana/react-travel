import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ShoppingCartState {
  loading: boolean
  items: any[]
  error: string | null
}

const initialState: ShoppingCartState = {
  loading: true,
  items: [],
  error: null,
}

export const getShoppingCart = createAsyncThunk(
  'shoppingCart/getShoppingCart',
  async (jwt: string) => {
    const { data } = await axios.get(
      'http://123.56.149.216:8080/api/shoppingCart',
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    )
    return data.shoppingCartItems
  }
)

export const addShoppingCartItem = createAsyncThunk(
  'shoppingCart/addShoppingCartItem',
  async ({ jwt, touristRouteId }: { jwt: string; touristRouteId: string }) => {
    const { data } = await axios.post(
      'http://123.56.149.216:8080/api/shoppingCart/items',
      {
        touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    )
    return data.shoppingCartItems
  }
)

export const checkout = createAsyncThunk(
  'shoppingCart/checkout',
  async (jwt: string) => {
    const { data } = await axios.post(
      'http://123.56.149.216:8080/api/shoppingCart/checkout',
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    )
    return data
  }
)

export const clearShoppingCartItem = createAsyncThunk(
  'shoppingCart/clearShoppingCartItem',
  async ({ jwt, itemIds }: { jwt: string; itemIds: number[] }) => {
    return await axios.delete(
      `http://123.56.149.216:8080/api/shoppingCart/items/(${itemIds.join(
        ','
      )})`,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    )
  }
)

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: state => {
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false
      state.items = action.payload
      state.error = null
    },
    [getShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false
      state.error = action.payload
    },
    [addShoppingCartItem.pending.type]: state => {
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false
      state.items = action.payload
      state.error = null
    },
    [addShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false
      state.error = action.payload
    },
    [clearShoppingCartItem.pending.type]: state => {
      state.loading = true
    },
    [clearShoppingCartItem.fulfilled.type]: state => {
      state.loading = false
      state.items = []
      state.error = null
    },
    [clearShoppingCartItem.rejected.type]: (
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
      state.items = []
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
