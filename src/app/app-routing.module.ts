import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./routes/login/login.component";
import { AuthGuard } from "./authentication/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      isAuthSection: true
    }
  },
  {
    path: "sign-up",
    loadChildren: () => import("./routes/sign-up/sign-up.module").then((m) => m.SignUpModule),
    data: {
      isAuthSection: true
    }
  },
  {
    path: "home",
    loadChildren: () => import("./routes/home/home.module").then((m) => m.HomeModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: "articles",
    loadChildren: () => import("./routes/articles/articles.module").then((m) => m.ArticlesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
