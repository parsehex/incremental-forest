import draw from './draw';
import { clamp } from '../../../utils';

export default class ProgressBar {
  constructor(sprite) {
    this.sprite = sprite;
    this.game = sprite.game;

    this.draw = draw.bind(this);

    this.draw();
  }

  show() {
    this.graphic.visible = true;
  }
  hide() {
    this.graphic.visible = false;
  }
  update() {
    this.graphic.width = clamp(28 * (this.sprite.progress / this.sprite.progressMax), 0, 100);
  }
}
