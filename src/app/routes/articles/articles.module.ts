import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticlesRoutingModule } from "./articles-routing.module";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { SharedModule } from "../../shared/shared.module";
import { ArticleFormModule } from "./shared/components/article-form/article-form.module";

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [CommonModule, ArticlesRoutingModule, SharedModule, ArticleFormModule],
})
export class ArticlesModule {}
