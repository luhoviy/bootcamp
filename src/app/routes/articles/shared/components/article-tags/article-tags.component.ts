import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { TagsService } from "../../../../../shared/services/tags.service";

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

  constructor(private tagService: TagsService) {}

  @Input() set tags(data: string[]) {
    this.tagChips = data.map((tag) => ({
      text: tag,
      color: this.tagService.defineTagColor(tag)
    }));
  }
}
