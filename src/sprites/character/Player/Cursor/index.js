import draw from './draw';
import move from './move';

import { objectsAtTile } from '../../../../world';

export default class Cursor {
  constructor(player) {
    this.player = player;
    this.game = player.game;

    this.draw = draw.bind(this);
    this.move = move.bind(this);

    this.draw();
  }

  get objects() {
    const objects = objectsAtTile(this.tile);

    return objects;
  }
}
