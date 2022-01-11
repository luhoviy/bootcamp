import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError, map, Observable, of, take } from "rxjs";
import { Store } from "@ngrx/store";
import { ArticlesService } from "../../articles/shared/services/articles.service";
import * as ArticleActions from "../../../store/articles/articles.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { ToasterService } from "../../../shared/services/toaster.service";
import { Toast, ToastType } from "../../../shared/services/toaster.model";

@Injectable()
export class HomeResolver implements Resolve<boolean> {
  constructor(
    private store: Store,
    private articlesService: ArticlesService,
    private toaster: ToasterService
  ) {}

  resolve(): Observable<boolean> {
    return this.articlesService.getAll().pipe(
      take(1),
      map((list) => {
        this.store.dispatch(ArticleActions.getArticlesSuccess({ list }));
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch(ArticleActions.getArticlesFailure({ error }));
        this.store.dispatch(ArticleActions.updateArticlesList({ list: [] }));
        this.toaster.present(new Toast({ text: error.error.message, type: ToastType.ERROR }));
        return of(true);
      })
    );
  }
}
