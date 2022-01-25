import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentRendererComponent } from "./comment-renderer/comment-renderer.component";
import { ArticleCommentsComponent } from "./article-comments.component";
import { SharedModule } from "../../../../../shared/shared.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [CommentRendererComponent, ArticleCommentsComponent],
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule, MatMenuModule],
  exports: [ArticleCommentsComponent]
})
export class ArticleCommentsModule {}
