import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { ClearObservable } from "./components/clear-observable";
import { HumanizedTimePipe } from "./pipes/humanized-time.pipe";

@NgModule({
  declarations: [ClearObservable, HumanizedTimePipe],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HumanizedTimePipe,
  ],
})
export class SharedModule {}
