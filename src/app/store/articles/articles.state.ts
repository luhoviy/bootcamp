import { Article } from "../../shared/models/article.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Tag } from "../../shared/models/tag.model";
import { SearchConfig } from "../../shared/models/search-config.model";

export interface ArticlesState {
  readonly list: Article[];
  readonly tags: Tag[];
  readonly searchConfig: SearchConfig;
  readonly error: HttpErrorResponse;
}

export const ArticlesInitialState: ArticlesState = {
  list: [],
  tags: [],
  error: null,
  searchConfig: new SearchConfig()
};
