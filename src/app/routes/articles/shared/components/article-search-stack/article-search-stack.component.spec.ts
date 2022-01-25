import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ArticleSearchStackComponent } from "./article-search-stack.component";

describe("ArticleSearchStackComponent", () => {
  let component: ArticleSearchStackComponent;
  let fixture: ComponentFixture<ArticleSearchStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleSearchStackComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSearchStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
