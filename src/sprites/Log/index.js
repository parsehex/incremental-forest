import Phaser from 'phaser';

import collide from './collide';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'logs', 0);

    this.anchor.setTo(0.5, 0.5);

    this.collides = false;
    this.collide = collide.bind(this);
  }
}
