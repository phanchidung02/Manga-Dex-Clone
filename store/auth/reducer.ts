import { PayloadAction } from "@reduxjs/toolkit"
import { IAuthStore } from "."

export const authReducers = {
  updateAuthenticated: (state: IAuthStore, action: PayloadAction<boolean>) => {
    state.isAuthenciated = action.payload
  },
}
