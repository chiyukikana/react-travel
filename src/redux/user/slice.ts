import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface UserState {
  loading: boolean
  error: string | null
  token: string | null
}

const initialState: UserState = {
  // 点击登录按钮后开始加载！
  loading: false,
  error: null,
  token: null,
}

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axios.post('http://123.56.149.216:8080/auth/login', {
      email,
      password,
    })
    return data.token
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending.type]: state => {
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.loading = false
      state.token = action.payload
      state.error = null
    },
    [signIn.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
