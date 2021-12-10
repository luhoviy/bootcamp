import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { delay, map, withLatestFrom } from "rxjs";
import { tap } from "rxjs/operators";
import { updateLoadingState } from "../app.actions";
import { NotificationsService } from "../../shared/services/notifications.service";
import { getCurrentUser } from "../../authentication/store";
import { cloneDeep } from "lodash";
import { createArticle, createArticleSuccess } from "./articles.actions";

@Injectable()
export class ArticlesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private notifications: NotificationsService
  ) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticle),
      withLatestFrom(this.store.select(getCurrentUser)),
      tap(() => this.store.dispatch(updateLoadingState({isLoading: true}))),
      delay(500),
      map(([{article}, user]) => {
        article = cloneDeep(article);
        article.authorId = user?.id;
        article.author = cloneDeep(user);
        this.store.dispatch(updateLoadingState({isLoading: false}));
        this.notifications.success("Article has been successfully published!");
        return createArticleSuccess({article});
      })
    )
  );
}
