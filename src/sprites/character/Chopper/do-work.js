import { nextCoord, findObjByKey } from '../../../utils';
import { objectsAtTile } from '../../../world';

export default function doWork() {
  // ensure that we're facing a tree
  const nextTile = nextCoord(this.tile.x, this.tile.y, this.faceDirection, 1);
  const objects = objectsAtTile(nextTile.x, nextTile.y);
  const facingTree = findObjByKey(objects, 'objectType', 'tree');

  if (facingTree !== false) {
    const treeFell = facingTree.interact(this);

    if (treeFell) {
      this.cancelWork();
    }
  } else {
    this.cancelWork();
  }
}
