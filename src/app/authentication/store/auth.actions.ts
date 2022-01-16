import { createAction, props } from "@ngrx/store";
import { AuthResponse, LoginCredentials, SignUpInfo } from "../../shared/models/auth.model";
import { HttpErrorResponse } from "@angular/common/http";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const login = createAction(LOGIN, props<LoginCredentials>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ authResponse: AuthResponse }>());
export const loginFailure = createAction(LOGIN_FAILURE, props<{ error: HttpErrorResponse }>());

export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const signUp = createAction(SIGNUP, props<{ userInfo: SignUpInfo }>());
export const signUpSuccess = createAction(SIGNUP_SUCCESS, props<{ authResponse: AuthResponse }>());
export const signUpFailure = createAction(SIGNUP_FAILURE, props<{ error: HttpErrorResponse }>());

export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const refreshTokenSuccess = createAction(
  REFRESH_TOKEN_SUCCESS,
  props<{ authResponse: AuthResponse }>()
);

export const LOGOUT = "LOGOUT";
export const logout = createAction(LOGOUT);

export const EXTRACT_AUTH_DATA = "EXTRACT_AUTH_DATA";
export const extractAuthData = createAction(EXTRACT_AUTH_DATA);

export const CLEAR_AUTH_STATE = "CLEAR_AUTH_STATE";
export const clearAuthState = createAction(CLEAR_AUTH_STATE);
