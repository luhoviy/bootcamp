import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticleTagsComponent } from "./article-tags.component";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  declarations: [ArticleTagsComponent],
  exports: [ArticleTagsComponent],
  imports: [CommonModule, MatChipsModule]
})
export class ArticleTagsModule {}
