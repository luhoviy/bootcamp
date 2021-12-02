import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { Article } from "../shared/models/article.model";
import {
  CREATE_ARTICLE_FAILURE,
  CREATE_ARTICLE_SUCCESS,
  createArticle,
} from "../../../store";
import { Actions, ofType } from "@ngrx/effects";
import { take, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import { ClearObservable } from "../../../shared/components/clear-observable";
import { ArticleFormComponent } from "../shared/components/article-form/article-form.component";

@Component({
  selector: "app-create-article",
  templateUrl: "./create-article.component.html",
  styleUrls: ["./create-article.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleComponent extends ClearObservable {
  @ViewChild(ArticleFormComponent) formComponent: ArticleFormComponent;

  constructor(private store: Store, private actions$: Actions) {
    super();
  }

  createArticle(article: Article): void {
    this.store.dispatch(createArticle({ article }));
    this.actions$
      .pipe(
        ofType(CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAILURE),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(({ type }) => {
        if (type === CREATE_ARTICLE_SUCCESS) {
          this.formComponent.formDirective.resetForm();
        }
      });
  }
}
