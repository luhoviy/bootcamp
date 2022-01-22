import { Action, createReducer, on } from "@ngrx/store";
import { ArticlesInitialState, ArticlesState } from "./articles.state";
import * as ArticlesActions from "./articles.actions";
import { cloneDeep } from "lodash";
import { Tag } from "../../shared/models/tag.model";

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
  on(ArticlesActions.deleteArticleSuccess, (state, { id }) => {
    const list = cloneDeep(state.list).filter((el) => el._id !== id);
    return {
      ...state,
      list
    };
  }),
  on(ArticlesActions.getTagsSuccess, (state, { tags }) => {
    return {
      ...state,
      tags: tags.map((tag) => new Tag(tag))
    };
  }),
  on(ArticlesActions.getTagsFailure, (state) => {
    return {
      ...state,
      tags: []
    };
  }),
  on(
    ArticlesActions.getArticlesFailure,
    ArticlesActions.createArticleFailure,
    ArticlesActions.getTagsFailure,
    (state, { error }) => {
      return {
        ...state,
        error
      };
    }
  )
);

export const ArticlesReducerFactory = (state: ArticlesState | undefined, action: Action) =>
  reducer(state, action);
