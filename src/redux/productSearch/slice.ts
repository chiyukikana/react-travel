import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ProductSearchState {
  loading: boolean
  data: any
  error: string | null
  pagination: any
}

const initialState: ProductSearchState = {
  loading: true,
  data: [],
  error: null,
  pagination: null,
}

export const getSearchContent = createAsyncThunk(
  'productSearch/getSearchContent',
  async (params: {
    keywords: string
    nextPage: string | number
    pageSize: string | number
  }) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${params.nextPage}&pageSize=${params.pageSize}`
    if (params.keywords) {
      url += `&keywords=${params.keywords}`
    }
    const response = await axios.get(url)
    return {
      data: response.data,
      pagination: JSON.parse(response.headers['x-pagination']!),
    }
  }
)

export const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {},
  extraReducers: {
    [getSearchContent.pending.type]: state => {
      state.loading = true
    },
    [getSearchContent.fulfilled.type]: (state, action) => {
      state.loading = false
      state.data = action.payload.data
      state.pagination = action.payload.pagination
      state.error = null
    },
    [getSearchContent.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
