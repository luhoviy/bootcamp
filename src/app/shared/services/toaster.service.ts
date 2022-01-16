import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Toast } from "../models/toaster.model";

@Injectable({
  providedIn: "root"
})
export class ToasterService {
  constructor(protected snackBar: MatSnackBar) {}

  public present(toast: Toast): void {
    const buttonText = toast.showButton ? toast.buttonText : undefined;
    this.snackBar.open(toast.text, buttonText, toast.buildConfig());
  }
}
