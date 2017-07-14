import { nextCoord } from '../../../utils';
import { objectsAtTile } from '../../../world';

export default function doWork() {
  const nextTile = nextCoord(this.tile.x, this.tile.y, this.faceDirection, 1);
  const objects = objectsAtTile(nextTile.x, nextTile.y);

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].hasOwnProperty('collide')) {
      objects[i].collide(this.player);
    }
  }

  this.cancelWork();
}
