import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "./auth-layout.component";
import { SharedModule } from "../../shared.module";
import { RouterModule } from "@angular/router";
import { ImageFadeInDirective } from "../../directives/image-fade-in.directive";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [AuthLayoutComponent, ImageFadeInDirective],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    AuthLayoutComponent,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AuthLayoutModule {}
