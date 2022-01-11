import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { logout } from "../../../authentication/store";

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
export class HeaderComponent {
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

  constructor(private store: Store) {}

  logout(): void {
    this.store.dispatch(logout());
  }
}
