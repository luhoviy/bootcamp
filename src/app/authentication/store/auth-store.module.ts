import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store, StoreModule } from "@ngrx/store";
import { authReducerFactory } from "./auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ArticlesEffects } from "./auth.effects";
import { extractAuthData } from "./auth.actions";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("auth", authReducerFactory),
    EffectsModule.forFeature([ArticlesEffects])
  ]
})
export class AuthStoreModule {
  constructor(private store: Store) {
    this.store.dispatch(extractAuthData());
  }
}
