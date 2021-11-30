import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ArticlesState } from "./articles.state";
import { delay, map } from "rxjs";
import * as fromFeature from ".";

@Injectable()
export class ArticlesEffects {
  constructor(private actions$: Actions, private store: Store<ArticlesState>) {}

  createArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromFeature.createArticle),
        delay(500),
        map(({ article }) => fromFeature.createArticleSuccess({ article }))
      ),
    { dispatch: false }
  );
}
