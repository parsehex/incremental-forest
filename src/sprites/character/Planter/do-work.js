import { nextCoord, findObjByKey } from '../../../utils';
import { objectsAtTile } from '../../../world';
import { tileToPixel } from '../../../tiles';

import PineCone from '../../object/PineCone';

export default function doWork() {
  // ensure that we're facing a tree
  const nextTile = nextCoord(this.tile, this.faceDirection, 1);
  const objects = objectsAtTile(nextTile);

  const player = this.game.state.states.Game.player;

  if (objects.length === 0 && player.inventory.items['pine-cone'].value > 0) {
    const pixelCoord = tileToPixel(nextTile);
    const pineCone = new PineCone({
      game: this.game,
      x: pixelCoord.x,
      y: pixelCoord.y,
      placed: true,
    });

    player.inventory.items['pine-cone'].value--;

    pineCone.place(this);
  }

  this.cancelWork();
}
