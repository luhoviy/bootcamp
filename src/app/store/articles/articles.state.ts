import { Article } from "../../routes/articles/shared/models/article.model";
import { HttpErrorResponse } from "@angular/common/http";

export interface ArticlesState {
  readonly list: Article[];
  readonly error: HttpErrorResponse;
}

export const ArticlesInitialState: ArticlesState = {
  list: [],
  error: null,
};
