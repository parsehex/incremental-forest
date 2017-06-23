import { nextCoord, findObjByKey } from '../../../utils';
import { objectsAtTile } from '../../../world';
import { tileToPixel } from '../../../tiles';
import objectPool from '../../../object-pool';

import PineCone from '../../object/PineCone';

export default function doWork() {
  if (this.player.inventory.money.value < this.salary) return this.destroy();

  // ensure that we're facing a tree
  const nextTile = nextCoord(this.tile, this.faceDirection, 1);
  const objects = objectsAtTile(nextTile);

  if (objects.length === 0 && this.player.inventory.items['pine-cone'].value > 0) {
    const pixelCoord = tileToPixel(nextTile);
    const pineCone = objectPool.new('pine-cone', PineCone, {
      game: this.game,
      x: pixelCoord.x,
      y: pixelCoord.y,
      placed: true,
    });

    this.player.inventory.items['pine-cone'].value--;

    pineCone.place(this);

    // this.player.inventory.addDebt(this.salary);
    this.player.inventory.money.value -= this.salary;
  }

  this.cancelWork();
}
