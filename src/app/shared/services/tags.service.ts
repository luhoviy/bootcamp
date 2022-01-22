import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { Tag } from "../models/tag.model";
import { Store } from "@ngrx/store";
import { getTagsList } from "../../store";
import { isEmpty } from "lodash";
import { ThemePalette } from "@angular/material/core";
import { getRandomThemeColor } from "../utils";

@Injectable({
  providedIn: "root"
})
export class TagsService {
  private readonly API_URL = "api/tags";

  constructor(private http: HttpClient, private store: Store) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.API_URL);
  }

  defineTagColor(tagText: string): ThemePalette {
    let tagList: Tag[] = [];
    this.store
      .select(getTagsList)
      .pipe(take(1))
      .subscribe((list) => (tagList = list));
    const targetTag = tagList.find((tag) => tag.text === tagText);
    if (isEmpty(targetTag)) {
      return getRandomThemeColor();
    }
    return targetTag.color;
  }
}
