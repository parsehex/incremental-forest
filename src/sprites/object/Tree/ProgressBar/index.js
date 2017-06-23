import draw from './draw';

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
  update(percent) {
    this.graphic.width = 28 * percent;
  }
}
