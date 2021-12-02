import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { getArticlesList, updateArticles } from "../../store";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  takeUntil,
  withLatestFrom,
} from "rxjs";
import { Article } from "../articles/shared/models/article.model";
import { ClearObservable } from "../../shared/components/clear-observable";
import { cloneDeep, isEqual, orderBy } from "lodash";
import { getCurrentUser } from "../../authentication/store";
import { User } from "../../authentication/models/user.model";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends ClearObservable implements OnInit {
  articles: Article[] = [];
  saveArticlesList$ = new Subject<Article[]>();
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

    this.saveArticlesList$
      .pipe(
        debounceTime(700),
        distinctUntilChanged((prev, current) => isEqual(prev, current)),
        takeUntil(this.destroy$)
      )
      .subscribe((list) => {
        this.store.dispatch(updateArticles({ list }));
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
            article.currentUserLiked = article.likes.includes(user.id);
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

  toggleLikeStatement(article: Article, liked: boolean): void {
    article.currentUserLiked = liked;
    liked
      ? article.likes.push(this.currentUser.id)
      : (article.likes = article.likes.filter((id) => id !== this.currentUser.id));
    this.saveArticlesList$.next(this.articles);
  }
}
