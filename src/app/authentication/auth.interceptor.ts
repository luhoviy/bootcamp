import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { catchError, filter, finalize, Observable, switchMap, take, throwError } from "rxjs";
import { Store } from "@ngrx/store";
import { getAccessToken, getIsLoggedIn, logout, refreshTokenSuccess } from "./store";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { ToasterService } from "../shared/services/toaster.service";
import { Toast, ToastType } from "../shared/services/toaster.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private store: Store,
    private toaster: ToasterService,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.setAuthHeader(request);
    return next.handle(request).pipe(
      catchError((error) => {
        return this.store.select(getIsLoggedIn).pipe(
          switchMap((isLoggedIn) => {
            if (
              error instanceof HttpErrorResponse &&
              error.status === 401 &&
              !this.isRefreshing &&
              isLoggedIn
            ) {
              return this.handleUnauthorizedError(request, next);
            }
            return throwError(error);
          })
        );
      })
    );
  }

  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    this.store
      .select(getAccessToken)
      .pipe(
        take(1),
        filter((token) => !!token)
      )
      .subscribe((token) => {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      });
    return req;
  }

  private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isRefreshing = true;
    return this.authService.refresh().pipe(
      take(1),
      switchMap((authResponse) => {
        this.store.dispatch(refreshTokenSuccess({ authResponse }));
        return next.handle(this.setAuthHeader(request));
      }),
      catchError((err) => {
        this.store.dispatch(logout());
        this.toaster.present(
          new Toast({ type: ToastType.ERROR, text: "Your token has expired. Please login again." })
        );
        return throwError(err);
      }),
      finalize(() => (this.isRefreshing = false))
    );
  }
}
