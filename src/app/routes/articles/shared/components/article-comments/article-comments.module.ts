import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentRendererComponent } from "./comment-renderer/comment-renderer.component";
import { ArticleCommentsComponent } from "./article-comments.component";
import { SharedModule } from "../../../../../shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [CommentRendererComponent, ArticleCommentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  exports: [ArticleCommentsComponent]
})
export class ArticleCommentsModule {}
