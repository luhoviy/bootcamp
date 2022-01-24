import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Article } from "../../../shared/models/article.model";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, finalize, take, takeUntil, throwError } from "rxjs";
import { ArticlesService } from "../shared/services/articles.service";
import { updateLoadingState } from "../../../store";
import { ClearObservable } from "../../../shared/components/clear-observable";
import { ToasterService } from "../../../shared/services/toaster.service";
import { Toast } from "../../../shared/models/toaster.model";

@Component({
  selector: "app-edit-article",
  templateUrl: "./edit-article.component.html",
  styleUrls: ["./edit-article.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditArticleComponent extends ClearObservable {
  article: Article;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store,
    private articleService: ArticlesService,
    private toaster: ToasterService,
    private cd: ChangeDetectorRef
  ) {
    super();
    activateRoute.data.pipe(take(1)).subscribe(({ article }) => {
      this.article = article;
    });
  }

  editArticle(article: Article): void {
    this.store.dispatch(updateLoadingState({ isLoading: true }));
    this.articleService
      .update(article)
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        catchError((error) => {
          this.toaster.present(Toast.buildHttpErrorToast(error));
          return throwError(error);
        }),
        finalize(() => this.store.dispatch(updateLoadingState({ isLoading: false })))
      )
      .subscribe(() => {
        this.article = { ...this.article, ...article };
        this.toaster.present(new Toast({ text: "Article has been saved." }));
        this.cd.markForCheck();
      });
  }
}
