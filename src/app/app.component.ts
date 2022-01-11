import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { distinctUntilChanged, filter, map, Observable, switchMap } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly isAuthSection$: Observable<boolean> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.activeRoute),
    map((route) => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    }),
    switchMap((route) => route.data),
    map((data) => !!data["isAuthSection"]),
    distinctUntilChanged()
  );

  constructor(private activeRoute: ActivatedRoute, private router: Router) {}
}
