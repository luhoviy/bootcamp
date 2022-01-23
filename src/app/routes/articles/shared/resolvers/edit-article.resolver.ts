import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { filter, map, Observable, take, withLatestFrom } from "rxjs";
import { ArticleResolver } from "./article.resolver";
import { Article } from "../../../../shared/models/article.model";
import { ArticlesService } from "../services/articles.service";
import { ToasterService } from "../../../../shared/services/toaster.service";
import { Store } from "@ngrx/store";
import { getCurrentUser } from "../../../../authentication/store";
import { Toast, ToastType } from "../../../../shared/models/toaster.model";

@Injectable({
  providedIn: "root"
})
export class EditArticleResolver implements Resolve<Article> {
  constructor(
    private articleResolver: ArticleResolver,
    private router: Router,
    private articlesService: ArticlesService,
    private toaster: ToasterService,
    private store: Store
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    return this.articleResolver.resolve(route).pipe(
      withLatestFrom(this.store.select(getCurrentUser)),
      take(1),
      filter(([article]) => !!article),
      map(([article, user]) => {
        if (article.author._id !== user._id) {
          this.toaster.present(
            new Toast({ type: ToastType.ERROR, text: "Access denied. You can edit only your own articles." })
          );
          this.router.navigateByUrl("/home");
          return null;
        }
        return article;
      })
    );
  }
}
