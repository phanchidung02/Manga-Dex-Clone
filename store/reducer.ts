import { api } from "@/services/apiInstance";
import { combineReducers } from "@reduxjs/toolkit";
import { featureReducers } from "./features/reducer";
import { authReducer } from "./auth";

export const combinedReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  counter: featureReducers,
  auth: authReducer,
});
