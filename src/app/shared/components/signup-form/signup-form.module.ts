import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupFormComponent } from "./signup-form.component";
import { SharedModule } from "../../shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [SignupFormComponent],
  exports: [SignupFormComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class SignupFormModule {}
