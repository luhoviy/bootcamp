import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticlesRoutingModule } from "./articles-routing.module";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { SharedModule } from "../../shared/shared.module";
import { ArticleDetailsComponent } from "./article-details/article-details.component";
import { EditArticleComponent } from "./edit-article/edit-article.component";
import { ArticleSharedModule } from "./shared/components/article-shared.module";
import { ArticleCommentsModule } from "./shared/components/article-comments/article-comments.module";

@NgModule({
  declarations: [CreateArticleComponent, ArticleDetailsComponent, EditArticleComponent],
  imports: [CommonModule, ArticlesRoutingModule, SharedModule, ArticleSharedModule, ArticleCommentsModule]
})
export class ArticlesModule {}
