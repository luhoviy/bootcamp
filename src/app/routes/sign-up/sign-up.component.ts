import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { SignUpInfo } from "../../shared/models/auth.model";
import { signUp } from "../../authentication/store";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent {
  constructor(private store: Store) {}

  public signUp(userInfo: SignUpInfo): void {
    this.store.dispatch(signUp({ userInfo }));
  }
}
