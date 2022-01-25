import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Article } from "../../../../../shared/models/article.model";
import { CommentExtended } from "../../../../../shared/models/comment.model";
import { isEmpty, orderBy } from "lodash";
import { ClearObservable } from "../../../../../shared/components/clear-observable";
import { ArticleCommentsService } from "../../services/article-comments.service";
import { filter, switchMap, take, takeUntil } from "rxjs";
import { User } from "../../../../../shared/models/user.model";
import { Store } from "@ngrx/store";
import { getCurrentUser } from "../../../../../authentication/store";
import { ConfirmDialogData } from "../../../../../shared/components/confirmation-dialog/confirmation-dialog.model";
import { ConfirmationDialogService } from "../../../../../shared/components/confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: "app-article-comments",
  templateUrl: "./article-comments.component.html",
  styleUrls: ["./article-comments.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentsComponent extends ClearObservable implements OnInit {
  _article: Article;
  comments: CommentExtended[] = [];
  currentUser: User;

  @Input() set article(data: Article) {
    this._article = data;
    if (isEmpty(data)) {
      return;
    }
    this.comments = data.comments.map((comment) => new CommentExtended(comment));
    this.comments = orderBy(this.comments, "createdAt", "desc");
  }

  @Input() darkTheme = true;

  constructor(
    private commentService: ArticleCommentsService,
    private store: Store,
    private cd: ChangeDetectorRef,
    private confirmDialog: ConfirmationDialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(getCurrentUser)
      .pipe(take(1))
      .subscribe((user) => (this.currentUser = user));
  }

  addComment(comment: CommentExtended): void {
    this.comments.unshift(comment);
  }

  updateComment(comment: CommentExtended): void {
    const id = this.comments.findIndex((el) => el._id === comment._id);
    this.comments[id] = { ...comment, editMode: false };
  }

  deleteComment(id: string): void {
    const dialogData = new ConfirmDialogData();
    dialogData.title = "Are you sure you want to delete this comment?";

    this.confirmDialog
      .open(dialogData)
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => this.commentService.delete(id)),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.comments = this.comments.filter((comment) => comment._id !== id);
        this.cd.markForCheck();
      });
  }
}
