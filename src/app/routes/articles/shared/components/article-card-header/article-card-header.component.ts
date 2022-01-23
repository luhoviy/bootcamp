import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Article } from "../../../../../shared/models/article.model";
import { deleteArticle, toggleArticleLike } from "../../../../../store";
import { cloneDeep } from "lodash";
import { Store } from "@ngrx/store";
import { User } from "../../../../../shared/models/user.model";
import { getCurrentUser } from "../../../../../authentication/store";
import { take } from "rxjs";

@Component({
  selector: "app-article-card-header",
  templateUrl: "./article-card-header.component.html",
  styleUrls: ["./article-card-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardHeaderComponent implements OnInit {
  @Input() article: Article;
  currentUser: User;
  isCurrentUserAuthor: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.store
      .select(getCurrentUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.currentUser = user;
        if (!!this.article) {
          this.isCurrentUserAuthor = this.article.author._id === user._id;
        }
      });
  }

  toggleLikeStatement(article: Article): void {
    article.currentUserLiked = !article.currentUserLiked;
    article.currentUserLiked
      ? article.likes.push(this.currentUser._id)
      : (article.likes = article.likes.filter((id) => id !== this.currentUser._id));
    this.store.dispatch(toggleArticleLike({ article: cloneDeep(article) }));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticle({ id: this.article._id }));
  }
}
