import { createAction, props } from "@ngrx/store";
import { Article, BaseArticle } from "../../shared/models/article.model";
import { HttpErrorResponse } from "@angular/common/http";

export const GET_ARTICLES = "GET_ARTICLES";
export const GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS";
export const GET_ARTICLES_FAILURE = "GET_ARTICLES_FAILURE";

export const getArticles = createAction(GET_ARTICLES);
export const getArticlesSuccess = createAction(GET_ARTICLES_SUCCESS, props<{ list: Article[] }>());
export const getArticlesFailure = createAction(GET_ARTICLES_FAILURE, props<{ error: HttpErrorResponse }>());

export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const updateArticle = createAction(UPDATE_ARTICLE, props<{ article: Article }>());

export const UPDATE_ARTICLES_LIST = "UPDATE_ARTICLES_LIST";
export const updateArticlesList = createAction(UPDATE_ARTICLES_LIST, props<{ list: Article[] }>());

export const CREATE_ARTICLE = "CREATE_ARTICLE";
export const CREATE_ARTICLE_SUCCESS = "CREATE_ARTICLE_SUCCESS";
export const CREATE_ARTICLE_FAILURE = "CREATE_ARTICLE_FAILURE";

export const createArticle = createAction(CREATE_ARTICLE, props<{ article: BaseArticle }>());
export const createArticleSuccess = createAction(CREATE_ARTICLE_SUCCESS, props<{ article: Article }>());
export const createArticleFailure = createAction(
  CREATE_ARTICLE_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const DELETE_ARTICLE_SUCCESS = "DELETE_ARTICLE_SUCCESS";
export const DELETE_ARTICLE_FAILURE = "DELETE_ARTICLE_FAILURE";

export const deleteArticle = createAction(DELETE_ARTICLE, props<{ id: string }>());
export const deleteArticleSuccess = createAction(DELETE_ARTICLE_SUCCESS, props<{ id: string }>());
export const deleteArticleFailure = createAction(
  DELETE_ARTICLE_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const TOGGLE_ARTICLE_LIKE = "TOGGLE_ARTICLE_LIKE";
export const TOGGLE_ARTICLE_LIKE_SUCCESS = "TOGGLE_ARTICLE_LIKE_SUCCESS";
export const TOGGLE_ARTICLE_LIKE_FAILURE = "TOGGLE_ARTICLE_LIKE_FAILURE";

export const toggleArticleLike = createAction(TOGGLE_ARTICLE_LIKE, props<{ article: Article }>());
export const toggleArticleLikeSuccess = createAction(
  TOGGLE_ARTICLE_LIKE_SUCCESS,
  props<{ article: Article }>()
);
export const toggleArticleLikeFailure = createAction(
  TOGGLE_ARTICLE_LIKE_FAILURE,
  props<{ error: HttpErrorResponse }>()
);
