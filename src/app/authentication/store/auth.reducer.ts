import { Action, createReducer, on } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";
import * as AuthActions from "./auth.actions";

const reducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,
    AuthActions.signUpSuccess,
    AuthActions.refreshTokenSuccess,
    (state, { authResponse }) => {
      return {
        ...state,
        ...authResponse
      };
    }
  ),
  on(
    AuthActions.loginSuccess,
    AuthActions.signUpSuccess,
    AuthActions.refreshTokenSuccess,
    (state, { authResponse }) => {
      return {
        ...state,
        ...authResponse
      };
    }
  ),
  on(
    AuthActions.loginFailure,
    AuthActions.signUpFailure,
    AuthActions.refreshTokenFailure,
    (state, { error }) => {
      return {
        ...state,
        error
      };
    }
  ),
  on(AuthActions.clearAuthState, () => {
    return {
      ...initialState
    };
  })
);

export const authReducerFactory = (state: AuthState | undefined, action: Action) => reducer(state, action);
