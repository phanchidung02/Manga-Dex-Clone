import { PayloadAction } from "@reduxjs/toolkit";
import { IFeaturesStore } from ".";

export const featureReducers = {
  increment: (state: IFeaturesStore) => {
    state.value += 1;
  },
  decrement: (state: IFeaturesStore) => {
    state.value -= 1;
  },
  // Use the PayloadAction type to declare the contents of `action.payload`
  incrementByAmount: (state: IFeaturesStore, action: PayloadAction<number>) => {
    state.value += action.payload;
  },
};
