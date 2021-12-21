import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteArticle, getArticlesList, toggleArticleLike } from "../../store";
import { map, takeUntil, withLatestFrom } from "rxjs";
import { Article } from "../articles/shared/models/article.model";
import { ClearObservable } from "../../shared/components/clear-observable";
import { cloneDeep, orderBy } from "lodash";
import { getCurrentUser } from "../../authentication/store";
import { User } from "../../authentication/models/user.model";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends ClearObservable implements OnInit {
  articles: Article[] = [];
  currentUser: User;
  isDesktop: boolean;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSubscriptions();
    this.getArticles();
  }

  private initSubscriptions(): void {
    this.breakpointObserver
      .observe("(min-width:1024px)")
      .pipe(
        map((res) => res.matches),
        takeUntil(this.destroy$)
      )
      .subscribe((isDesktop) => {
        this.isDesktop = isDesktop;
        this.cdr.markForCheck();
      });
  }

  private getArticles(): void {
    this.store
      .select(getArticlesList)
      .pipe(
        withLatestFrom(this.store.select(getCurrentUser)),
        map(([list, user]) => {
          list = orderBy(cloneDeep(list), "createdAt", "desc");
          this.currentUser = user;
          return list.map((article) => {
            article.currentUserLiked = article.likes.includes(user._id);
            return article;
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((articles) => {
        this.articles = articles;
        this.cdr.markForCheck();
      });
  }

  toggleLikeStatement(article: Article): void {
    const liked = (article.currentUserLiked = !article.currentUserLiked);
    liked
      ? article.likes.push(this.currentUser._id)
      : (article.likes = article.likes.filter((id) => id !== this.currentUser._id));
    this.store.dispatch(toggleArticleLike({ article: cloneDeep(article) }));
  }

  deleteArticle(article: Article): void {
    this.store.dispatch(deleteArticle({ id: article._id }));
  }
}
