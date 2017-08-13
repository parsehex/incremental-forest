import { pixelToTile } from '../../tiles';
import objectPool from '../../object-pool';

import tween from './tween';

export default class extends Phaser.Image {
  constructor(game, x, y, sprite, frame, id, objectType) {
    super(game, x, y, sprite, frame);

    this.anchor.setTo(0.5, 0.5);

    // use a bunch of different properties to hopefully achieve a unique id
    this.id = id || this.key + this.frame + this.x + this.y + (Math.floor(Math.random() * 100) + 1);

    this.objectType = objectType || 'generic';

    this.tile = {};

    this.setTile();
  }

  move(nextPixelCoord, callback) {
    this.moving = true;

    tween.call(this, nextPixelCoord, 35, function() {
      this.moving = false;

      this.setTile();

      if (callback) callback.call(this);
    });
  }

  setTile() {
    this.tile = pixelToTile(this.x, this.y);
  }

  resetObject() {
    this.setTile();
    this.timers = [];
    this.destroyed = false;
  }

  destroy() {
    this.kill();

    this.destroyed = true;

    objectPool.remove(this);
  }
}
