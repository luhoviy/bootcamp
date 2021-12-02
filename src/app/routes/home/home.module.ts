import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SharedModule } from "../../shared/shared.module";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent,
      },
    ]),
    MatSidenavModule,
    SharedModule,
    MatListModule,
  ],
})
export class HomeModule {}
