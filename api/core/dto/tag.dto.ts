export class TagDto {
  _id: string;
  text: string;

  constructor(tag: TagDto) {
    this._id = tag._id;
    this.text = tag.text;
  }
}
