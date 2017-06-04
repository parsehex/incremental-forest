import Phaser from 'phaser';

import { tile, alignToGrid } from '../../tiles';
import { add, remove } from '../../world';

export default class extends Phaser.Sprite {
  constructor(game, x, y, sprite, frame) {
    const alignedCoords = alignToGrid({ x, y });

    x = alignedCoords.x;
    y = alignedCoords.y;

    super(game, x, y, sprite, frame);

    this.anchor.setTo(0.5, 0.5);

    // use a bunch of different properties to hopefully achieve a unique id
    this.id = this.key + this.frame + this.x + this.y + (Math.floor(Math.random() * 100) + 1);

    this.tile = tile.call(this);

    add.call(this, null);
  }

  destroy() {
    const player = this.game.state.states.Game.player;
    remove.call(this);

    super.destroy();
    player.checkFacing();
  }
}
