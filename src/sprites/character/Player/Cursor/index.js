import draw from './draw';
import move from './move';

import { objectsAtTile, onChange } from '../../../../world';
import { pixelToTile } from '../../../../tiles';

export default class Cursor {
  constructor(player) {
    this.player = player;
    this.game = player.game;

    this.draw = draw.bind(this);
    this.move = move.bind(this);

    this.draw();

    onChange('player-cursor', (tileX, tileY, objects) => {
      // we don't care about tiles the cursor isn't on
      if (tileX !== this.tile.x || tileY !== this.tile.y) return;

      this.objects = objects;
    });
  }

  setTile() {
    this.tile = pixelToTile(this.graphic.x, this.graphic.y);

    this.objects = objectsAtTile(this.tile.x, this.tile.y);
  }
}
