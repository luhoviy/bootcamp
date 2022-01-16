import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Tag } from "../../../../../shared/models/tag.model";
import { ThemePalette } from "@angular/material/core";
import { sample } from "lodash";
import { ThemeColors } from "../../../../../shared/consts";

interface TagChip {
  text: string;
  color: ThemePalette;
}

@Component({
  selector: "app-article-tags",
  templateUrl: "./article-tags.component.html",
  styleUrls: ["./article-tags.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleTagsComponent {
  tagChips: TagChip[] = [];

  @Input() set tags(data: Tag[]) {
    this.tagChips = data.map((tag) => ({
      text: tag.text,
      color: sample(ThemeColors)
    }));
  }
}
