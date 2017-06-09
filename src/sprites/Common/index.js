import Phaser from 'phaser';

import { tile, nextTile, alignToGrid, pixelToTile } from '../../tiles';
import { add, remove, movedTo } from '../../world';
import { clone } from '../../utils';

import tween from './tween';

export default class extends Phaser.Sprite {
  constructor(game, x, y, sprite, frame, id, objectType) {
    const alignedCoords = alignToGrid({ x, y });

    x = alignedCoords.x;
    y = alignedCoords.y;

    super(game, x, y, sprite, frame);

    this.anchor.setTo(0.5, 0.5);

    // use a bunch of different properties to hopefully achieve a unique id
    this.id = id || this.key + this.frame + this.x + this.y + (Math.floor(Math.random() * 100) + 1);

    this.objectType = objectType || 'generic';

    const groups = this.game.state.states.Game.groups;
    if (this.id === 'player') {
      groups.player.add(this);
    } else {
      groups.objects.add(this);

      // this.placed = null;
    }

    this.tile = {};

    this.setTile();

    if (this.id !== 'player') add.call(this, null);

    this.timers = [];
  }

  move(nextPixelCoord) {
    const oldTileCoord = tile.call(this);

    this.moving = true;

    if (this.cursor) {
      this.cursor.move(true);
    }

    tween.call(this, nextPixelCoord, 25, function() {
      this.moving = false;

      this.setTile();

      if (this.id !== 'player') movedTo.call(this, oldTileCoord);
    });
  }

  setTile() {
    this.tile = tile.call(this);
  }

  destroy() {
    const player = this.game.state.states.Game.player;

    if (this.id !== 'player') remove.call(this);

    super.destroy();

    player.cursor.move();
  }
}
