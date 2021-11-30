import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatButtonModule],
  exports: [FlexLayoutModule, MatIconModule, MatButtonModule],
})
export class SharedModule {}
