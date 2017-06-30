import draw from './draw';
import move from './move';

import { objectsAtTile, onChange } from '../../../../world';
import { tile } from '../../../../tiles';
import hints from '../../../../game-data/hints';
import { showHint, hideHint } from '../../../../ui';

export default class Cursor {
  constructor(player) {
    this.player = player;
    this.game = player.game;

    this.draw = draw.bind(this);
    this.move = move.bind(this);

    this.draw();

    onChange('player-cursor', (tileCoord, objects) => {
      // we don't care about tiles the cursor isn't on
      if (tileCoord.x !== this.tile.x || tileCoord.y !== this.tile.y) return;

      this.objects = objects;
    });
  }

  setTile() {
    this.tile = tile({ x: this.graphic.x, y: this.graphic.y });

    this.objects = objectsAtTile(this.tile);
  }
}
