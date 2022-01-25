import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ArticleCardHeaderComponent } from "./article-card-header.component";

describe("ArticleCardHeaderComponent", () => {
  let component: ArticleCardHeaderComponent;
  let fixture: ComponentFixture<ArticleCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleCardHeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
