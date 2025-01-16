import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { IAuthStore } from ".";
import { authService } from "@/services/api/auth/auth";

export const extraReducers = (
  builders: ActionReducerMapBuilder<IAuthStore>
) => {
  builders.addMatcher(
    isAnyOf(authService.endpoints.checkAuth.matchFulfilled),
    (state, _) => {
      state.isAuthenciated = true;
    }
  );

  builders.addMatcher(authService.endpoints.checkAuth.matchRejected, (state, _) => {
    state.isAuthenciated = false;
  });
};
