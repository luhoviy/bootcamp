import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "new",
  },
  {
    path: "new",
    loadChildren: () => import("./create-article/create-article.module").then((m) => m.CreateArticleModule),
  },
  {
    path: "**",
    redirectTo: "new",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
