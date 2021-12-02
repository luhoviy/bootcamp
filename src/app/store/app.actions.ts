import { createAction, props } from "@ngrx/store";

export const UPDATE_LOADING_STATE = "UPDATE_LOADING_STATE";
export const updateLoadingState = createAction(UPDATE_LOADING_STATE, props<{ isLoading: boolean }>());
