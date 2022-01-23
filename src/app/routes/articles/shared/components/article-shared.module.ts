import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticleFormComponent } from "./article-form/article-form.component";
import { SharedModule } from "../../../../shared/shared.module";
import { ArticleTagsComponent } from "./article-tags/article-tags.component";
import { ArticleCardHeaderComponent } from "./article-card-header/article-card-header.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [ArticleFormComponent, ArticleTagsComponent, ArticleCardHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatMenuModule
  ],
  exports: [ArticleFormComponent, ArticleTagsComponent, ArticleCardHeaderComponent]
})
export class ArticleSharedModule {}
