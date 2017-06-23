import { nextCoord, findObjByKey } from '../../../utils';
import { objectsAtTile } from '../../../world';

export default function doWork() {
  if (this.player.inventory.money.value < this.salary) return this.destroy();

  // ensure that we're facing a tree
  const nextTile = nextCoord(this.tile, this.faceDirection, 1);
  const objects = objectsAtTile(nextTile);
  const facingTree = findObjByKey(objects, 'objectType', 'tree');

  if (facingTree !== false) {
    const treeFell = facingTree.interact(this);

    if (treeFell) {
      // this.player.inventory.addDebt(this.salary);
      this.player.inventory.money.value -= this.salary;
    }
  }

  this.cancelWork();
}
