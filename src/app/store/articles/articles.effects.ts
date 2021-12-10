import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { delay, map, withLatestFrom } from "rxjs";
import { tap } from "rxjs/operators";
import { updateLoadingState } from "../app.actions";
import { ToasterService } from "../../shared/services/toaster.service";
import { getCurrentUser } from "../../authentication/store";
import { cloneDeep } from "lodash";
import { createArticle, createArticleSuccess } from "./articles.actions";
import { Toast, ToastConfig } from "../../shared/services/toaster.model";

@Injectable()
export class ArticlesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private toaster: ToasterService
  ) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticle),
      withLatestFrom(this.store.select(getCurrentUser)),
      tap(() => this.store.dispatch(updateLoadingState({ isLoading: true }))),
      delay(500),
      map(([{ article }, user]) => {
        article = cloneDeep(article);
        article.authorId = user?.id;
        article.author = cloneDeep(user);
        this.store.dispatch(updateLoadingState({ isLoading: false }));
        const config: ToastConfig = { text: "Article has been successfully published!" };
        this.toaster.present(new Toast(config));
        return createArticleSuccess({ article });
      })
    )
  );
}
