import { Directive, ElementRef, NgZone, OnDestroy, Renderer2 } from "@angular/core";
import { fromEvent, Subject, take, takeUntil } from "rxjs";

@Directive({
  selector: "[appImageFadeIn]"
})
export class ImageFadeInDirective implements OnDestroy {
  destroy$ = new Subject<void>();

  constructor(
    private imageRef: ElementRef<HTMLImageElement>,
    private renderer: Renderer2,
    private zone: NgZone
  ) {
    this.renderer.setStyle(this.imageRef.nativeElement, "visibility", "hidden");
    this.renderer.setStyle(this.imageRef.nativeElement, "opacity", "0");
    this.renderer.setStyle(this.imageRef.nativeElement, "pointer-events", "none");
    this.renderer.setStyle(this.imageRef.nativeElement, "user-select", "none");
    this.renderer.setStyle(this.imageRef.nativeElement, "transition", "opacity 1s ease-out");

    this.zone.runOutsideAngular(() => {
      fromEvent(this.imageRef.nativeElement, "load")
        .pipe(take(1), takeUntil(this.destroy$))
        .subscribe(() => {
          this.renderer.setStyle(this.imageRef.nativeElement, "visibility", "visible");
          this.renderer.setStyle(this.imageRef.nativeElement, "opacity", "1");
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
