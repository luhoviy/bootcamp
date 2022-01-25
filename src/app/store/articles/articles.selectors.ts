import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArticlesState } from "./articles.state";

const getArticlesState = createFeatureSelector<ArticlesState>("articles");

export const getArticlesList = createSelector(getArticlesState, (state) => (state ? state.list : null));

export const getTagsList = createSelector(getArticlesState, (state) => (state ? state.tags : null));

export const getSearchConfig = createSelector(getArticlesState, (state) =>
  state ? state.searchConfig : null
);
