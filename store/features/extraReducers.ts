import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { IFeaturesStore } from ".";

export const extraReducers = (
  builders: ActionReducerMapBuilder<IFeaturesStore>
) => {
  // builders.addMatcher(
  //   isAnyOf(userService.endpoints.getMe.matchFulfilled),
  //   (state, _) => {
  //     state.isAuthenciated = true
  //   }
  // )
  // builders.addMatcher(userService.endpoints.getMe.matchRejected, (state, _) => {
  //   state.isAuthenciated = false
  // })
};
