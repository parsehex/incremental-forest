import Phaser from 'phaser';

import frames from '../../sprite-frames';

import update from './update';
import Inventory from './inventory';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'guy', frames.GUY.STAND_DOWN);

    this.anchor.setTo(0.5, 0.5);

    this.faceDirection = 'DOWN';
    this.faceObject = null;

    this.inventory = new Inventory(this.game);

    this.update = update.bind(this);
  }
}
