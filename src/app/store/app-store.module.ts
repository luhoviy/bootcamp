import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "./app.reducers";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "../../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ArticlesEffects } from "./articles/articles.effects";
import { AppEffects } from "./app.effects";
import { AuthStoreModule } from "../authentication/store/auth-store.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([AppEffects, ArticlesEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthStoreModule,
  ],
})
export class AppStoreModule {}
