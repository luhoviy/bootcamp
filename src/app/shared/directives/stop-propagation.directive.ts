import { Directive, ElementRef, NgZone, OnDestroy } from "@angular/core";
import { fromEvent, Subject, takeUntil } from "rxjs";

@Directive({
  selector: "[appStopPropagation]"
})
export class StopPropagationDirective implements OnDestroy {
  destroy$ = new Subject<void>();

  constructor(private zone: NgZone, private elRef: ElementRef<HTMLElement>) {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.elRef.nativeElement, "click")
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => {
          event.stopPropagation();
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
