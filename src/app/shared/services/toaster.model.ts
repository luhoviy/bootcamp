import {
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

export enum ToastType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

export interface ToastConfig {
  text: string;
  type?: ToastType;
  durationInSeconds?: number;
  showButton?: boolean;
  buttonText?: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}

export class Toast implements ToastConfig {
  public text: string;
  public type: ToastType;
  public durationInSeconds: number;
  public showButton: boolean;
  public buttonText: string;
  public horizontalPosition: MatSnackBarHorizontalPosition;
  public verticalPosition: MatSnackBarVerticalPosition;

  constructor(config: ToastConfig) {
    this.text = config.text;
    this.type = config.type || ToastType.SUCCESS;
    this.durationInSeconds = config.durationInSeconds || 3;
    this.showButton = config.showButton || false;
    this.buttonText = config.buttonText || "Dismiss";
    this.horizontalPosition = config.horizontalPosition || "right";
    this.verticalPosition = config.verticalPosition || "bottom";
  }

  public buildConfig(): MatSnackBarConfig {
    return {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: this.getPanelClass(this.type)
    };
  }

  protected getPanelClass(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS:
        return "success-snackbar";
      case ToastType.ERROR:
        return "error-snackbar";
      default:
        return "";
    }
  }
}
