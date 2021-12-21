import { Action, createReducer, on } from "@ngrx/store";
import { ArticlesInitialState, ArticlesState } from "./articles.state";
import * as ArticlesActions from "./articles.actions";
import { cloneDeep } from "lodash";

const reducer = createReducer(
  ArticlesInitialState,
  on(ArticlesActions.getArticlesSuccess, ArticlesActions.updateArticlesList, (state, { list }) => {
    return {
      ...state,
      list
    };
  }),
  on(ArticlesActions.updateArticle, ArticlesActions.toggleArticleLikeSuccess, (state, { article }) => {
    const list = cloneDeep(state.list);
    const articleIndex = list.findIndex((el) => el._id === article._id);
    list[articleIndex] = article;
    return {
      ...state,
      list
    };
  }),
  on(ArticlesActions.createArticleSuccess, (state, { article }) => {
    const list = Array.isArray(state.list) ? [...state.list, article] : [article];
    return {
      ...state,
      list
    };
  }),
  on(ArticlesActions.deleteArticleSuccess, (state, { article }) => {
    const list = cloneDeep(state.list).filter((el) => el._id !== article._id);
    return {
      ...state,
      list
    };
  }),
  on(ArticlesActions.getArticlesFailure, ArticlesActions.createArticleFailure, (state, { error }) => {
    return {
      ...state,
      error
    };
  })
);

export const ArticlesReducerFactory = (state: ArticlesState | undefined, action: Action) =>
  reducer(state, action);
