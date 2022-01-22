import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SharedModule } from "../../shared/shared.module";
import { HomeResolver } from "./resolvers/home.resolver";
import { ArticleTagsModule } from "../articles/shared/components/article-tags/article-tags.module";
import { TagsResolver } from "../articles/shared/resolvers/tags.resolver";

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
    ArticleTagsModule
  ],
  providers: [HomeResolver]
})
export class HomeModule {}
