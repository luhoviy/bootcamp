import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { SharedModule } from "../../shared.module";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, SharedModule, MatMenuModule, RouterModule],
})
export class HeaderModule {}
