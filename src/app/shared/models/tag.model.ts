import { ThemePalette } from "@angular/material/core";
import { getRandomThemeColor } from "../utils";

export class Tag {
  _id: string;
  text: string;

  // for client side
  color: ThemePalette;

  constructor(tag: Tag) {
    this._id = tag._id;
    this.text = tag.text;
    this.color = tag.color || getRandomThemeColor();
  }
}
