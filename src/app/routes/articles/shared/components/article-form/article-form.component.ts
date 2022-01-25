import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { Article, BaseArticle } from "../../../../../shared/models/article.model";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { isEmpty, isEqual, orderBy } from "lodash";
import { Store } from "@ngrx/store";
import { getTagsList } from "../../../../../store";
import { map, take, takeUntil } from "rxjs";
import { ClearObservable } from "../../../../../shared/components/clear-observable";

@Component({
  selector: "app-article-form",
  templateUrl: "./article-form.component.html",
  styleUrls: ["./article-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFormComponent extends ClearObservable implements OnInit {
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() onSubmit = new EventEmitter<Article>();

  @Input() set article(data: Article) {
    this._article = data;
    this.isEditMode = !isEmpty(data);
    if (this.form?.value) {
      this.checkFormEquality();
    }
  }

  _article: Article;
  isEditMode = false;
  isEqualToOriginalArticle = true;
  form: FormGroup;
  tagList: string[] = [];

  constructor(private fb: FormBuilder, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.getTags();
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: [this._article ? this._article.title : "", [Validators.required, Validators.minLength(2)]],
      description: [
        this._article ? this._article.description : "",
        [Validators.required, Validators.minLength(10)]
      ]
    });

    if (this.tagList.length) {
      this.form.addControl("tags", this.fb.control(this._article ? this._article.tags : []));
    }

    if (this.isEditMode) {
      this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.checkFormEquality());
    }
  }

  private getTags(): void {
    this.store
      .select(getTagsList)
      .pipe(
        take(1),
        map((list) => list.map((tag) => tag.text)),
        map((tags) => orderBy(tags))
      )
      .subscribe((list) => (this.tagList = list));
  }

  private checkFormEquality(): void {
    this.isEqualToOriginalArticle = isEqual({ ...this._article, ...this.form.value }, this._article);
  }

  submit(): void {
    const article: Article = this.isEditMode
      ? { ...this._article, ...this.form.value }
      : new BaseArticle(this.form.value);
    this.onSubmit.emit(article);
  }
}
