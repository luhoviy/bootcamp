import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, finalize, map, of, switchMap } from "rxjs";
import { tap } from "rxjs/operators";
import { updateLoadingState } from "../app.actions";
import { ToasterService } from "../../shared/services/toaster.service";
import * as ArticleActions from "./articles.actions";
import { Toast, ToastType } from "../../shared/services/toaster.model";
import { ArticlesService } from "../../routes/articles/shared/services/articles.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ArticlesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private toaster: ToasterService,
    private articleService: ArticlesService
  ) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.createArticle),
      tap(() => this.store.dispatch(updateLoadingState({ isLoading: true }))),
      switchMap(({ article }) => {
        return this.articleService.create(article).pipe(
          map((createdArticle) => {
            this.toaster.present(new Toast({ text: "Article has been successfully published!" }));
            return ArticleActions.createArticleSuccess({ article: createdArticle });
          }),
          catchError((error: HttpErrorResponse) => {
            const toast = new Toast({
              text: error.error.message,
              type: ToastType.ERROR
            });
            this.toaster.present(toast);
            return of(ArticleActions.createArticleFailure({ error }));
          }),
          finalize(() => this.store.dispatch(updateLoadingState({ isLoading: false })))
        );
      })
    )
  );
}
