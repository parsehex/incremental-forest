import { nextCoord, findObjByKey } from '../../../utils';
import { objectsAtTile } from '../../../world';

export default function doWork() {
  if (this.player.inventory.money.value < this.salary) return this.destroy();

  const nextTile = nextCoord(this.tile, this.faceDirection, 1);
  const objects = objectsAtTile(nextTile);

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].hasOwnProperty('collide')) {
      objects[i].collide(this.player);

      // this.player.inventory.addDebt(this.salary);
      // this.player.inventory.money.value -= this.salary;
    }
  }

  this.cancelWork();
}
