import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateArticleComponent } from "./create-article.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: CreateArticleComponent,
      },
    ]),
  ],
})
export class CreateArticleModule {}
