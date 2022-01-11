import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { Observable, take } from "rxjs";
import { Store } from "@ngrx/store";
import { getIsLoggedIn } from "../store";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkIsLoggedIn();
  }

  canLoad(): Observable<boolean> {
    return this.checkIsLoggedIn();
  }

  private checkIsLoggedIn(): Observable<boolean> {
    return this.store.select(getIsLoggedIn).pipe(
      take(1),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
