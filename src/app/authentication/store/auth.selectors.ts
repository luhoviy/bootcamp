import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

const getAuthenticationState = createFeatureSelector<AuthState>("auth");

export const getCurrentUser = createSelector(getAuthenticationState, (state) => (state ? state.user : null));

export const getIsLoggedIn = createSelector(getCurrentUser, (user) => !!user);

export const getAccessToken = createSelector(getAuthenticationState, (state) =>
  state ? state.accessToken : null
);
