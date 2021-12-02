import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home",
  },
  {
    path: "home",
    loadChildren: () => import("./routes/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "articles",
    loadChildren: () => import("./routes/articles/articles.module").then((m) => m.ArticlesModule),
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
