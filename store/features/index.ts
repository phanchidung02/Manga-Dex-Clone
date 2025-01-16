import { createSlice } from "@reduxjs/toolkit";
import { featureReducers } from "./reducer";
import { extraReducers } from "./extraReducers";

export interface IFeaturesStore {
  value: number;
}
const initialState: IFeaturesStore = {
  value: 0,
};
const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: featureReducers,
  extraReducers: extraReducers,
});
export const {
  increment,
  decrement,
} = featureSlice.actions;
export const authReducer = featureSlice.reducer;
