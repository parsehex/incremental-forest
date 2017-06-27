import { nextCoord, findObjByKey } from '../../../utils';
import { objectsAtTile } from '../../../world';

export default function doWork() {
  const nextTile = nextCoord(this.tile, this.faceDirection, 1);
  const objects = objectsAtTile(nextTile);

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].hasOwnProperty('collide')) {
      objects[i].collide(this.player);
    }
  }

  this.cancelWork();
}
