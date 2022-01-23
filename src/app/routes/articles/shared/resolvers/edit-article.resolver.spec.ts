import { TestBed } from "@angular/core/testing";

import { EditArticleResolver } from "./edit-article.resolver";

describe("EditArticleResolver", () => {
  let resolver: EditArticleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EditArticleResolver);
  });

  it("should be created", () => {
    expect(resolver).toBeTruthy();
  });
});
