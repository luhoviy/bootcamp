import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupFormComponent } from "./signup-form.component";
import { SharedModule } from "../../shared.module";

@NgModule({
  declarations: [SignupFormComponent],
  exports: [SignupFormComponent],
  imports: [CommonModule, SharedModule]
})
export class SignupFormModule {}
