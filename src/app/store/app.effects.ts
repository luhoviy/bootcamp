import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { updateLoadingState } from "./app.actions";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private spinner: NgxSpinnerService) {}

  toggleLoadingSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateLoadingState),
        tap(({ isLoading }) => (isLoading ? this.spinner.show() : this.spinner.hide()))
      ),
    { dispatch: false }
  );
}
