import draw from './draw';
import move from './move';

import { objectsAtTile, onChange } from '../../../../world';
import { tile } from '../../../../tiles';
import hints from '../../../../hints';
import { showHint, hideHint } from '../../../../ui';

export default class Cursor {
  constructor(player) {
    this.player = player;
    this.game = player.game;

    this.draw = draw.bind(this);
    this.move = move.bind(this);

    this.draw();

    onChange((tileCoord, objects) => {
      // we don't care about tiles the cursor isn't on
      if (tileCoord.x !== this.tile.x || tileCoord.y !== this.tile.y) return;

      this.objects = objects;

      this.showHints();
    });
  }

  showHints() {
    // TODO need early return if hint is same as last one
    const objects = this.objects;

    if (objects.length === 0) return hideHint();

    for (let i = 0; i < objects.length; i++) {
      let type = objects[i].objectType;

      if (type === 'pine-cone' && !objects[i].placed) continue;

      if (hints.hasOwnProperty(type)) {
        let hint = hints[type];
        showHint(hint.key, hint.action);
        break;
      }
    }
  }

  setTile() {
    this.tile = tile({ x: this.graphic.x, y: this.graphic.y });

    this.objects = objectsAtTile(this.tile);
  }
}
