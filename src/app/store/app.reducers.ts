import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { storeLogger } from "ngrx-store-logger";
import { environment } from "../../environments/environment";
import { ArticlesReducerFactory } from "./articles/articles.reducer";
import { ArticlesState } from "./articles";

export interface AppState {
  articles: ArticlesState;
}

export const reducers: ActionReducerMap<AppState> = {
  articles: ArticlesReducerFactory,
};

const logger = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => storeLogger()(reducer);
export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [logger];
