import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { matchPasswordsValidator } from "../../utils";
import { User } from "../../models/user.model";
import { SignUpInfo } from "../../models/auth.model";

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<SignUpInfo> = new EventEmitter();
  _user: User;
  form: FormGroup;
  isEditMode = false;

  @Input() set user(data: User) {
    this._user = data;
    this.isEditMode = !!data;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group(
      {
        firstName: [this._user ? this._user.firstName : "", [Validators.required, Validators.minLength(2)]],
        lastName: [this._user ? this._user.lastName : ""],
        email: ["", [Validators.email, Validators.required]],
        password: ["", [Validators.minLength(6), Validators.required]],
        passwordConfirmation: ["", [Validators.minLength(6), Validators.required]]
      },
      {
        validators: !this.isEditMode ? matchPasswordsValidator("password", "passwordConfirmation") : null
      }
    );

    if (this.isEditMode) {
      this.form.controls["email"].disable();
      this.form.controls["password"].disable();
      this.form.controls["passwordConfirmation"].disable();
    }
  }

  public submit(): void {
    const result = new SignUpInfo(this.form.value);
    this.onSubmit.emit(result);
  }
}
