import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "./auth-layout.component";
import { SharedModule } from "../../shared.module";
import { RouterModule } from "@angular/router";
import { ImageFadeInDirective } from "../../directives/image-fade-in.directive";

@NgModule({
  declarations: [AuthLayoutComponent, ImageFadeInDirective],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [AuthLayoutComponent, SharedModule, RouterModule]
})
export class AuthLayoutModule {}
