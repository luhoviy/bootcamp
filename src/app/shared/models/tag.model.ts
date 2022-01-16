export class Tag {
  _id: string;
  text: string;

  constructor(tag: Tag) {
    this._id = tag._id;
    this.text = tag.text;
  }
}
