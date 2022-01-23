import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { catchError, map, Observable, of, take, withLatestFrom } from "rxjs";
import { ArticlesService } from "../services/articles.service";
import { ToasterService } from "../../../../shared/services/toaster.service";
import { Article } from "../../../../shared/models/article.model";
import { isEmpty } from "lodash";
import { Store } from "@ngrx/store";
import { getCurrentUser } from "../../../../authentication/store";
import { HttpErrorResponse } from "@angular/common/http";
import { Toast } from "../../../../shared/models/toaster.model";

@Injectable({
  providedIn: "root"
})
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private router: Router,
    private articlesService: ArticlesService,
    private toaster: ToasterService,
    private store: Store
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    const extractedArticle: Article = this.router.getCurrentNavigation().extras.state?.article;
    if (!isEmpty(extractedArticle)) {
      return of(extractedArticle);
    }

    const id = route.paramMap.get("id");
    return this.articlesService.getOne(id).pipe(
      withLatestFrom(this.store.select(getCurrentUser)),
      take(1),
      map(([article, user]) => {
        article.currentUserLiked = article.likes.includes(user._id);
        return article;
      }),
      catchError((error: HttpErrorResponse) => {
        this.toaster.present(Toast.buildHttpErrorToast(error));
        this.router.navigateByUrl("/home");
        return of(null);
      })
    );
  }
}
