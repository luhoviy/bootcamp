import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SharedModule } from "../../shared/shared.module";
import { HomeResolver } from "./resolvers/home.resolver";
import { TagsResolver } from "../articles/shared/resolvers/tags.resolver";
import { ArticleSharedModule } from "../articles/shared/components/article-shared.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent,
        resolve: {
          home: HomeResolver,
          tags: TagsResolver
        }
      }
    ]),
    MatSidenavModule,
    SharedModule,
    ArticleSharedModule
  ],
  providers: [HomeResolver]
})
export class HomeModule {}
