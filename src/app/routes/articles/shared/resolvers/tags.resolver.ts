import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError, map, Observable, of, switchMap, take } from "rxjs";
import { Store } from "@ngrx/store";
import { TagsService } from "../../../../shared/services/tags.service";
import * as ArticleActions from "../../../../store/articles/articles.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { getTagsList } from "../../../../store";
import { isEmpty } from "lodash";

@Injectable({
  providedIn: "root"
})
export class TagsResolver implements Resolve<boolean> {
  constructor(private store: Store, private tagService: TagsService) {}

  resolve(): Observable<boolean> {
    return this.store.select(getTagsList).pipe(
      take(1),
      switchMap((tags) => {
        if (!isEmpty(tags)) {
          return of(true);
        }

        return this.tagService.getAll().pipe(
          take(1),
          map((tags) => {
            this.store.dispatch(ArticleActions.getTagsSuccess({ tags }));
            return true;
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(ArticleActions.getTagsFailure({ error }));
            return of(true);
          })
        );
      })
    );
  }
}
