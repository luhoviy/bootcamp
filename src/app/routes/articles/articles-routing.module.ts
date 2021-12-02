import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateArticleComponent } from "./create-article/create-article.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "new",
  },
  {
    path: "new",
    component: CreateArticleComponent,
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
