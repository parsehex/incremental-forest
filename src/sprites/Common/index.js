import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor(game, x, y, sprite, frame) {
    super(game, x, y, sprite, frame);

    this.anchor.setTo(0.5, 0.5);
  }
}
