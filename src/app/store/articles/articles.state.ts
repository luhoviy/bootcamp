import { Article } from "../../routes/articles/shared/models/article.model";
import { HttpErrorResponse } from "@angular/common/http";
import { generateFakeArticles } from "../../shared/utils";

export interface ArticlesState {
  readonly list: Article[];
  readonly error: HttpErrorResponse;
}

export const ArticlesInitialState: ArticlesState = {
  list: generateFakeArticles(),
  error: null,
};
