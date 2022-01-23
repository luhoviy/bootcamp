import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Article } from "../../../shared/models/article.model";
import { Store } from "@ngrx/store";
import { take, withLatestFrom } from "rxjs";
import { getCurrentUser } from "../../../authentication/store";
import { User } from "../../../shared/models/user.model";

@Component({
  selector: "app-article-details",
  templateUrl: "./article-details.component.html",
  styleUrls: ["./article-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailsComponent {
  article: Article;
  isAuthor: boolean;
  currentUser: User;

  constructor(activateRoute: ActivatedRoute, private store: Store) {
    activateRoute.data
      .pipe(withLatestFrom(store.select(getCurrentUser)), take(1))
      .subscribe(([{ article }, user]) => {
        this.article = article;
        this.currentUser = user;
        this.isAuthor = this.article.author._id === user._id;
      });
  }
}
