import draw from './draw';
import move from './move';

import { objectsAtTile, onChange } from '../../../../world';

export default class Cursor {
  constructor(player) {
    this.player = player;
    this.game = player.game;

    this.draw = draw.bind(this);
    this.move = move.bind(this);

    this.objects = [];

    onChange((tileCoord, objects) => {
      // we don't care about tiles the cursor isn't on
      if (tileCoord.x !== this.tile.x || tileCoord.y !== this.tile.y) return;

      this.objects = objects;
    });

    this.draw();
  }

  // get objects() {
  //   const objects = objectsAtTile(this.tile);
  //
  //   return objects;
  // }
}
