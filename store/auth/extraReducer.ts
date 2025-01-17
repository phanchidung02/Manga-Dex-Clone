import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { IAuthStore } from ".";
import { authService } from "@/services/api/auth/auth";

export const extraReducers = (
  builders: ActionReducerMapBuilder<IAuthStore>
) => {
  builders.addMatcher(
    isAnyOf(authService.endpoints.login.matchFulfilled, authService.endpoints.checkAuth.matchFulfilled),
    (state, { payload }) => {
      state.isAuthenciated = payload?.isAuthenticated;
    }
  );

  builders.addMatcher(isAnyOf(authService.endpoints.login.matchRejected, authService.endpoints.checkAuth.matchRejected), (state, _) => {
    state.isAuthenciated = false;
  });
};
