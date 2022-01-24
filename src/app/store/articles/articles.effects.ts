import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, filter, finalize, map, of, switchMap, take, withLatestFrom } from "rxjs";
import { tap } from "rxjs/operators";
import { updateLoadingState } from "../app.actions";
import { ToasterService } from "../../shared/services/toaster.service";
import * as ArticleActions from "./articles.actions";
import { Toast } from "../../shared/models/toaster.model";
import { ArticlesService } from "../../routes/articles/shared/services/articles.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ConfirmationDialogService } from "../../shared/components/confirmation-dialog/confirmation-dialog.service";
import { ConfirmDialogData } from "../../shared/components/confirmation-dialog/confirmation-dialog.model";
import { getCurrentUser } from "../../authentication/store";
import { Router } from "@angular/router";

@Injectable()
export class ArticlesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private toaster: ToasterService,
    private articleService: ArticlesService,
    private confirmDialog: ConfirmationDialogService
  ) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.createArticle),
      tap(() => this.store.dispatch(updateLoadingState({ isLoading: true }))),
      switchMap(({ article }) => {
        return this.articleService.create(article).pipe(
          take(1),
          map((createdArticle) => {
            this.toaster.present(new Toast({ text: "Article has been successfully published!" }));
            return ArticleActions.createArticleSuccess({ article: createdArticle });
          }),
          catchError((error: HttpErrorResponse) => {
            this.toaster.present(Toast.buildHttpErrorToast(error));
            return of(ArticleActions.createArticleFailure({ error }));
          }),
          finalize(() => this.store.dispatch(updateLoadingState({ isLoading: false })))
        );
      })
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      switchMap(({ id, redirect }) => {
        const dialogData = new ConfirmDialogData();
        dialogData.title = "Are you sure you want to delete this article?";
        dialogData.confirmButtonColor = "warn";
        dialogData.cancelButtonColor = "primary";

        return this.confirmDialog.open(dialogData).pipe(
          filter((confirmed) => confirmed),
          tap(() => this.store.dispatch(updateLoadingState({ isLoading: true }))),
          switchMap(() => {
            return this.articleService.deleteOne(id).pipe(
              take(1),
              map(() => {
                if (redirect) {
                  this.router.navigateByUrl("/home");
                }
                return ArticleActions.deleteArticleSuccess({ id });
              }),
              catchError((error: HttpErrorResponse) => {
                this.toaster.present(Toast.buildHttpErrorToast(error));
                return of(ArticleActions.deleteArticleFailure({ error }));
              }),
              finalize(() => this.store.dispatch(updateLoadingState({ isLoading: false })))
            );
          })
        );
      })
    )
  );

  toggleArticleLikeStatement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.toggleArticleLike),
      withLatestFrom(this.store.select(getCurrentUser)),
      switchMap(([{ article }, user]) => {
        const params = { articleID: article._id, userID: user._id };
        return this.articleService.toggleArticleLike(article.currentUserLiked, params).pipe(
          take(1),
          map((article) => ArticleActions.toggleArticleLikeSuccess({ article })),
          catchError((error) => of(ArticleActions.toggleArticleLikeFailure({ error })))
        );
      })
    )
  );
}
