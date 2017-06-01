import Phaser from 'phaser';

import frames from '../../sprite-frames';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles_generator', frames.GENERATOR.OFF);

    this.anchor.setTo(0.5, 0.5);
  }
}
