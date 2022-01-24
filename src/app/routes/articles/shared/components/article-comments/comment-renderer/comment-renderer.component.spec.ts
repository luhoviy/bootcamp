import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommentRendererComponent } from "./comment-renderer.component";

describe("CommentRendererComponent", () => {
  let component: CommentRendererComponent;
  let fixture: ComponentFixture<CommentRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentRendererComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
