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
import { isEmpty } from "lodash";

@Component({
  selector: "app-article-form",
  templateUrl: "./article-form.component.html",
  styleUrls: ["./article-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFormComponent implements OnInit {
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() onSubmit = new EventEmitter<Article>();

  @Input() set article(data: Article) {
    this._article = data;
    this.isEditMode = !isEmpty(data);
  }

  _article: Article;
  isEditMode = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
  }

  submit(): void {
    const { title, description } = this.form.value;
    const article: Article = this.isEditMode
      ? { ...this._article, ...this.form.value }
      : new BaseArticle(title, description);
    this.onSubmit.emit(article);
  }
}
