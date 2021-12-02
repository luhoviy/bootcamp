import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppStoreModule } from "./store/app-store.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HeaderModule } from "./shared/components/header/header.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately",
    }),
    AppStoreModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
