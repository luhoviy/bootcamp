import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
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

  @Input() set tags(data: string[]) {
    this.tagChips = data.map((tag) => ({
      text: tag,
      color: sample(ThemeColors)
    }));
  }
}
