import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToasterService } from "../../shared/services/toaster.service";
import * as AuthActions from "./auth.actions";
import { loginSuccess } from "./auth.actions";
import { catchError, of, switchMap, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { finalize, map, tap } from "rxjs/operators";
import { updateLoadingState } from "../../store";
import { Toast } from "../../shared/services/toaster.model";
import { Router } from "@angular/router";
import { isEmpty } from "lodash";
import { AuthResponse } from "../../shared/models/auth.model";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private toaster: ToasterService,
    private authService: AuthService,
    private router: Router
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      tap(() => this.store.dispatch(updateLoadingState({ isLoading: true }))),
      switchMap(({ userInfo }) =>
        this.authService.signup(userInfo).pipe(
          take(1),
          map((authResponse) => {
            this.router.navigateByUrl("/home");
            return AuthActions.signUpSuccess({ authResponse });
          }),
          catchError((error) => {
            this.toaster.present(Toast.buildHttpErrorToast(error));
            return of(AuthActions.signUpFailure({ error }));
          }),
          finalize(() => this.store.dispatch(updateLoadingState({ isLoading: false })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(() => this.store.dispatch(updateLoadingState({ isLoading: true }))),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          take(1),
          map((authResponse) => {
            this.router.navigateByUrl("/home");
            return AuthActions.signUpSuccess({ authResponse });
          }),
          catchError((error) => {
            this.toaster.present(Toast.buildHttpErrorToast(error));
            return of(AuthActions.loginFailure({ error }));
          }),
          finalize(() => this.store.dispatch(updateLoadingState({ isLoading: false })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem("auth");
        this.router.navigateByUrl("/login");
        this.authService.logout().pipe(take(1)).subscribe();
      }),
      map(() => AuthActions.clearAuthState())
    )
  );

  saveAuthDataToLocaleStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.signUpSuccess, AuthActions.refreshTokenSuccess),
        tap(({ authResponse }) => {
          localStorage.setItem("auth", JSON.stringify(authResponse));
        })
      ),
    { dispatch: false }
  );

  extractAuthDataFromLocaleStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.extractAuthData),
        tap(() => {
          try {
            let stringData = localStorage.getItem("auth");
            if (!isEmpty(stringData)) {
              const authData: AuthResponse = JSON.parse(stringData);
              this.store.dispatch(loginSuccess({ authResponse: authData }));
            }
          } catch (e) {
            localStorage.removeItem("auth");
            this.router.navigateByUrl("/login");
          }
        })
      ),
    { dispatch: false }
  );
}
