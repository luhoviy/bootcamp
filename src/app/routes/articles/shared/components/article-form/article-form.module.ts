import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ArticleFormComponent } from "./article-form.component";
import { SharedModule } from "../../../../../shared/shared.module";

@NgModule({
  declarations: [ArticleFormComponent],
  exports: [ArticleFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
  ],
})
export class ArticleFormModule {}
