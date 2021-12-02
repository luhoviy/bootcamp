import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { authReducerFactory } from "./auth.reducer";

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature("auth", authReducerFactory)],
})
export class AuthStoreModule {}
