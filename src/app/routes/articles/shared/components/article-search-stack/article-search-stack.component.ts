import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  BaseSearchSettings,
  SearchConfig,
  SortEnum,
  SortOrder
} from "src/app/shared/models/search-config.model";
import { Store } from "@ngrx/store";
import { getSearchConfig, getTagsList, updateSearchConfig } from "../../../../../store";
import { debounceTime, distinctUntilChanged, Subject, take, takeUntil } from "rxjs";
import { ClearObservable } from "../../../../../shared/components/clear-observable";
import { isEqual, orderBy } from "lodash";

@Component({
  selector: "app-article-search-stack",
  templateUrl: "./article-search-stack.component.html",
  styleUrls: ["./article-search-stack.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleSearchStackComponent extends ClearObservable implements OnInit, OnDestroy {
  readonly sortOrder = SortOrder;
  readonly sortEnum = SortEnum;
  formDestroySubject$ = new Subject<void>();
  searchConfig: SearchConfig;
  availableTags: string[];
  configForm: FormGroup;
  canResetConfig = false;

  constructor(private fb: FormBuilder, private store: Store, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.getTagList();
    this.getSearchConfig();
    this.initForm();
    this.checkForConfigUpdates();
  }

  private getTagList(): void {
    this.store
      .select(getTagsList)
      .pipe(take(1))
      .subscribe((list) => (this.availableTags = orderBy(list.map((tag) => tag.text))));
  }

  private getSearchConfig(): void {
    this.store
      .select(getSearchConfig)
      .pipe(takeUntil(this.destroy$))
      .subscribe((config) => {
        this.searchConfig = config;
        this.canResetConfig = this.checkIsRefreshAvailable(new BaseSearchSettings(config));
        this.cd.markForCheck();
      });
  }

  private initForm(): void {
    this.configForm = this.fb.group({
      tags: [this.searchConfig ? [...this.searchConfig.tags] : []],
      sortBy: [this.searchConfig ? this.searchConfig.sortBy : SortEnum.TIME],
      order: [this.searchConfig ? this.searchConfig.order : SortOrder.DESC]
    });
  }

  private checkForConfigUpdates(): void {
    this.configForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged((prev, next) => isEqual(prev, next)),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        const config: SearchConfig = { ...this.searchConfig, ...value };
        this.store.dispatch(updateSearchConfig({ config }));
      });
  }

  private checkIsRefreshAvailable(settings: BaseSearchSettings): boolean {
    return !isEqual(settings, new BaseSearchSettings());
  }

  resetConfig(): void {
    const config: SearchConfig = { ...this.searchConfig, ...new BaseSearchSettings() };
    this.store.dispatch(updateSearchConfig({ config }));
    this.searchConfig = config;
    this.destroyFormSub();
    this.initForm();
    this.checkForConfigUpdates();
    this.cd.markForCheck();
  }

  private destroyFormSub(): void {
    this.formDestroySubject$.next();
    this.formDestroySubject$.complete();
    this.formDestroySubject$ = new Subject();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.destroyFormSub();
  }
}
