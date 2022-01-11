import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getCurrentUser, logout } from "../../../authentication/store";
import { User } from "../../../authentication/models/user.model";
import { ClearObservable } from "../clear-observable";
import { takeUntil } from "rxjs";

interface NavItem {
  path: string;
  name: string;
  icon?: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends ClearObservable implements OnInit {
  readonly routes: NavItem[] = [
    {
      path: "/home",
      name: "Home",
      icon: "dashboard"
    },
    {
      path: "/articles/new",
      name: "New Article",
      icon: "post_add"
    }
  ];
  user: User;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(getCurrentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
