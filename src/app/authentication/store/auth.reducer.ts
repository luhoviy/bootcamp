import { Action, createReducer } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";

const reducer = createReducer(initialState);

export const authReducerFactory = (state: AuthState | undefined, action: Action) =>
  reducer(state, action);
