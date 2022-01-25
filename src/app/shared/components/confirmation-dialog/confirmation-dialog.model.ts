import { ThemePalette } from "@angular/material/core";

export class ConfirmDialogData {
  title = "Are you sure?";
  description: string = null;
  cancelButtonText = "Cancel";
  confirmButtonText = "Confirm";
  cancelButtonColor: ThemePalette = "warn";
  confirmButtonColor: ThemePalette = "primary";
}
