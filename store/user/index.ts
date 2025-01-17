import { UserResponse } from "@/services/api/users/user"
import { createSlice } from "@reduxjs/toolkit"
import { userReducers } from "./reducer"
import { extraReducers } from "./extraReducer"

export interface IUserStore {
  userInfo: UserResponse
}
const initialState: IUserStore = {
  userInfo: {} as UserResponse,
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducers,
  extraReducers: extraReducers
})
export const {} =
  userSlice.actions
export const userReducer = userSlice.reducer
