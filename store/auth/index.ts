import { createSlice } from "@reduxjs/toolkit"
import { extraReducers } from "./extraReducer"
import { authReducers } from "./reducer"

export interface IAuthStore {
  isAuthenciated: boolean
}
const initialState: IAuthStore = {
  isAuthenciated: false,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: authReducers,
  extraReducers: extraReducers
})
export const { updateAuthenticated } =
  authSlice.actions
export const authReducer = authSlice.reducer
