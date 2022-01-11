import { FormGroup } from "@angular/forms";

export const matchPasswordsValidator = (
  newPasswordControlName: string,
  matchingNewPasswordControlName: string
) => {
  return (formGroup: FormGroup) => {
    const newPasswordControl = formGroup.controls[newPasswordControlName];
    const matchingControl = formGroup.controls[matchingNewPasswordControlName];
    if (matchingControl.errors && !matchingControl.errors["passwordsNotEqual"]) return;
    if (newPasswordControl.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordsNotEqual: true });
      return;
    }
    matchingControl.setErrors(null);
  };
};
