import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getArticlesList, getSearchConfig, updateArticlesList, updateSearchConfig } from "../../store";
import { debounceTime, distinctUntilChanged, map, skip, switchMap, takeUntil, withLatestFrom } from "rxjs";
import { Article } from "../../shared/models/article.model";
import { ClearObservable } from "../../shared/components/clear-observable";
import { cloneDeep } from "lodash";
import { getCurrentUser } from "../../authentication/store";
import { User } from "../../shared/models/user.model";
import { BreakpointObserver } from "@angular/cdk/layout";
import { SearchConfig } from "../../shared/models/search-config.model";
import { ArticlesService } from "../articles/shared/services/articles.service";
import { tap } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends ClearObservable implements OnInit, OnDestroy {
  articles: Article[] = [];
  currentUser: User;
  isDesktop: boolean;
  searchConfig: SearchConfig;
  searchControl: FormControl;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private articleService: ArticlesService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSubscriptions();
    this.initSearchControl();
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

    this.observeSearchConfigAndUpdateList();
  }

  private observeSearchConfigAndUpdateList(): void {
    this.store
      .select(getSearchConfig)
      .pipe(
        tap((config) => (this.searchConfig = config)),
        skip(1),
        switchMap(() => this.articleService.getAll()),
        takeUntil(this.destroy$)
      )
      .subscribe((list) => {
        this.store.dispatch(updateArticlesList({ list }));
      });
  }

  private getArticles(): void {
    this.store
      .select(getArticlesList)
      .pipe(
        withLatestFrom(this.store.select(getCurrentUser)),
        map(([list, user]) => {
          this.currentUser = user;
          return cloneDeep(list).map((article) => {
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

  private initSearchControl(): void {
    this.searchControl = new FormControl(this.searchConfig ? this.searchConfig.searchKeyword : "");
    this.searchControl.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchKeyword) => {
        this.store.dispatch(updateSearchConfig({ config: { ...this.searchConfig, searchKeyword } }));
      });
  }

  clearSearchControl(): void {
    this.searchControl.setValue("");
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(updateSearchConfig({ config: { ...this.searchConfig, skip: 0 } }));
  }
}
