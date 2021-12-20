import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { ClearObservable } from "./components/clear-observable";
import { HumanizedTimePipe } from "./pipes/humanized-time.pipe";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [ClearObservable, HumanizedTimePipe, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    LoadingBarRouterModule,
    MatDialogModule
  ],
  exports: [
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    HumanizedTimePipe,
    LoadingBarRouterModule,
    MatDialogModule,
    ConfirmationDialogComponent
  ]
})
export class SharedModule {}
