import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { IUserStore } from ".";
import { userService } from "@/services/api/users/user";

export const extraReducers = (
  builders: ActionReducerMapBuilder<IUserStore>
) => {
  builders.addMatcher(
    isAnyOf(userService.endpoints.getMe.matchFulfilled),
    (state, { payload }) => {
      state.userInfo = payload;
    }
  );
};
