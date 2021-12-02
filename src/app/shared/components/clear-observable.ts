import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  template: ``,
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ClearObservable implements OnDestroy {
  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
