import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { TagsResolver } from "./shared/resolvers/tags.resolver";
import { ArticleDetailsComponent } from "./article-details/article-details.component";
import { ArticleResolver } from "./shared/resolvers/article.resolver";
import { EditArticleResolver } from "./shared/resolvers/edit-article.resolver";
import { EditArticleComponent } from "./edit-article/edit-article.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "new"
  },
  {
    path: "new",
    component: CreateArticleComponent,
    resolve: {
      tags: TagsResolver
    }
  },
  {
    path: ":id",
    component: ArticleDetailsComponent,
    resolve: {
      article: ArticleResolver
    }
  },
  {
    path: ":id/edit",
    component: EditArticleComponent,
    resolve: {
      article: EditArticleResolver,
      tags: TagsResolver
    }
  },
  {
    path: "**",
    redirectTo: "new"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {}
