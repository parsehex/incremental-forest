import draw from './draw';
import { clamp } from '../../../../utils';

export default class ProgressBar {
  constructor(tree) {
    this.tree = tree;
    this.game = tree.game;

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
    this.graphic.width = clamp(28 * (this.tree.progress / this.tree.progressMax), 0, 100);
  }
}
