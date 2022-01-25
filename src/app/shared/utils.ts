import { FormGroup } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { isEmpty, sample } from "lodash";
import { ThemeColors } from "./consts";
import { SearchConfig } from "./models/search-config.model";
import { HttpParams } from "@angular/common/http";

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

export const getRandomThemeColor = (): ThemePalette => {
  return sample(ThemeColors);
};

export const buildArticlesSearchHttpParams = (config: SearchConfig): HttpParams => {
  let params = new HttpParams()
    .set("sort", [config.sortBy, config.order].join(","))
    .set("skip", config.skip)
    .set("limit", config.limit);
  if (!isEmpty(config.tags)) {
    params = params.set("tags", config.tags.join(","));
  }
  if (!isEmpty(config.searchKeyword)) {
    params = params.set("search", config.searchKeyword);
  }
  return params;
};
