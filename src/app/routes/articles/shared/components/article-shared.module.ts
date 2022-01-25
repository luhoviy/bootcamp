import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticleFormComponent } from "./article-form/article-form.component";
import { SharedModule } from "../../../../shared/shared.module";
import { ArticleTagsComponent } from "./article-tags/article-tags.component";
import { ArticleCardHeaderComponent } from "./article-card-header/article-card-header.component";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatMenuModule } from "@angular/material/menu";
import { ArticleCommentsModule } from "./article-comments/article-comments.module";
import { ArticleSearchStackComponent } from "./article-search-stack/article-search-stack.component";

@NgModule({
  declarations: [
    ArticleFormComponent,
    ArticleTagsComponent,
    ArticleCardHeaderComponent,
    ArticleSearchStackComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    ArticleCommentsModule
  ],
  exports: [
    ArticleFormComponent,
    ArticleTagsComponent,
    ArticleCardHeaderComponent,
    ArticleSearchStackComponent
  ]
})
export class ArticleSharedModule {}
