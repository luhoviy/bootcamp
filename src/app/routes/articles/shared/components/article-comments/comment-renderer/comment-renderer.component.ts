import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Comment, CommentExtended } from "../../../../../../shared/models/comment.model";
import { finalize, Observable, of, take, takeUntil } from "rxjs";
import { ArticleCommentsService } from "../../../services/article-comments.service";
import { ClearObservable } from "../../../../../../shared/components/clear-observable";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-comment-renderer",
  templateUrl: "./comment-renderer.component.html",
  styleUrls: ["./comment-renderer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentRendererComponent extends ClearObservable implements OnInit {
  @Input() comment: CommentExtended = null;
  @Input() articleId: string;
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<CommentExtended>();
  commentCtrl: FormControl;
  showCommentActions = false;
  isLoading = false;

  constructor(private commentService: ArticleCommentsService) {
    super();
  }

  ngOnInit(): void {
    this.commentCtrl = new FormControl(!!this.comment ? this.comment.text : "");
    this.showCommentActions = !!this.comment;
  }

  setActionsVisibility(): void {
    if (!this.comment) {
      this.showCommentActions = true;
    }
  }

  cancel(): void {
    if (!!this.comment) {
      this.onCancel.emit();
      return;
    }
    this.resetCommentCtrl();
  }

  saveComment(): void {
    this.toggleLoadingState();
    const comment$ = !!this.comment ? this.editComment() : this.addComment();
    comment$
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        finalize(() => this.toggleLoadingState())
      )
      .subscribe((res) => {
        this.onSave.emit(new CommentExtended(res));
      });
  }

  private addComment(): Observable<Comment> {
    return this.commentService
      .add(this.commentCtrl.value, this.articleId)
      .pipe(tap(() => this.resetCommentCtrl()));
  }

  private editComment(): Observable<Comment> {
    const comment = { ...this.comment, text: this.commentCtrl.value };
    return comment.text === this.comment.text ? of(comment) : this.commentService.update(comment);
  }

  private toggleLoadingState(): void {
    this.isLoading = !this.isLoading;
    this.isLoading ? this.commentCtrl.disable() : this.commentCtrl.enable();
  }

  private resetCommentCtrl(): void {
    this.commentCtrl.setValue("");
    this.showCommentActions = false;
  }
}
