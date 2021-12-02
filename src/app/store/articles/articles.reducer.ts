import { Action, createReducer, on } from "@ngrx/store";
import { ArticlesInitialState, ArticlesState } from "./articles.state";
import * as ArticlesActions from "./articles.actions";

const reducer = createReducer(
  ArticlesInitialState,
  on(
    ArticlesActions.getArticlesSuccess,
    ArticlesActions.updateArticles,
    (state, { list }) => {
      return {
        ...state,
        list,
      };
    }
  ),
  on(ArticlesActions.createArticleSuccess, (state, { article }) => {
    const list = Array.isArray(state.list) ? [...state.list, article] : [article];
    return {
      ...state,
      list,
    };
  }),
  on(
    ArticlesActions.getArticlesFailure,
    ArticlesActions.createArticleFailure,
    (state, { error }) => {
      return {
        ...state,
        error,
      };
    }
  )
);

export const ArticlesReducerFactory = (
  state: ArticlesState | undefined,
  action: Action
) => reducer(state, action);
