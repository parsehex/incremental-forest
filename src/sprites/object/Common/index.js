import Common from '../../Common';

import { add, remove, movedTo } from '../../../world';

export default class CommonObject extends Common {
  constructor(game, x, y, sprite, frame, id, objectType) {
    super(game, x, y, sprite, frame, id, objectType);

    this.game.state.states.Game.groups.objects.add(this);

    add.call(this, null);
  }

  move(nextPixelCoord) {
    const oldTileCoord = tile.call(this);

    super.move(nextPixelCoord, function() {
      movedTo.call(this, oldTileCoord);
    });
  }

  destroy() {
    remove.call(this);

    super.destroy();
  }
}
