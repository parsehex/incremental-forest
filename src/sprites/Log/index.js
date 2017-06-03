import Phaser from 'phaser';

import frames from '../../sprite-frames';

import collide from './collide';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {

    this.anchor.setTo(0.5, 0.5);
    super(game, x, y, 'tiles', frames.MAIN.LOGS);

    this.collides = false;
    this.collide = collide.bind(this);
  }
}
