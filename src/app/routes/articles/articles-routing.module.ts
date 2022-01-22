import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { TagsResolver } from "./shared/resolvers/tags.resolver";

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
    path: "**",
    redirectTo: "new"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {}
