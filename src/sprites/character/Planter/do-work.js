import { nextCoord, findObjByKey } from '../../../utils';
import world from '../../../world';
import { tileToPixel } from '../../../tiles';
import objectPool from '../../../object-pool';

import PineCone from '../../object/PineCone';

export default function doWork() {
  // ensure that we're facing a tree
  const nextTile = nextCoord(this.tile.x, this.tile.y, this.faceDirection, 1);
  const objects = world.tile(nextTile.x, nextTile.y);

  if (objects.length === 0 && this.player.inventory.items['pine-cone'].value > 0) {
    const pixelCoord = tileToPixel(nextTile.x, nextTile.y);
    const pineCone = objectPool.new('pine-cone', PineCone, {
      game: this.game,
      x: pixelCoord.x,
      y: pixelCoord.y,
      placed: true,
    });

    this.player.inventory.items['pine-cone'].value--;

    pineCone.place(this);
  }

  this.cancelWork();
}
