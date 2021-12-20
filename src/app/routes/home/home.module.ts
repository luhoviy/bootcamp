import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SharedModule } from "../../shared/shared.module";
import { HomeResolver } from "./resolvers/home.resolver";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent,
        resolve: {
          home: HomeResolver
        }
      }
    ]),
    MatSidenavModule,
    SharedModule
  ],
  providers: [HomeResolver]
})
export class HomeModule {}
