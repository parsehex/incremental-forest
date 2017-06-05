import Phaser from 'phaser';

import { tile, alignToGrid } from '../../tiles';
import { add, remove } from '../../world';

export default class extends Phaser.Sprite {
  constructor(game, x, y, sprite, frame, id) {
    const alignedCoords = alignToGrid({ x, y });

    x = alignedCoords.x;
    y = alignedCoords.y;

    super(game, x, y, sprite, frame);

    this.anchor.setTo(0.5, 0.5);

    // use a bunch of different properties to hopefully achieve a unique id
    this.id = id || this.key + this.frame + this.x + this.y + (Math.floor(Math.random() * 100) + 1);

    const groups = this.game.state.states.Game.groups;
    if (this.id === 'player') {
      // add to player group
      groups.player.add(this);
    } else {
      // add to objects group
      groups.objects.add(this);
    }

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
