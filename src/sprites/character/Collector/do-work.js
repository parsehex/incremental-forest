import { nextCoord, findObjByKey } from '../../../utils';
import { objectsAtTile } from '../../../world';

export default function doWork() {
  // ensure that we're facing a tree
  const nextTile = nextCoord(this.tile, this.faceDirection, 1);
  const objects = objectsAtTile(nextTile);

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].hasOwnProperty('collide')) {
      objects[i].collide(this.game.state.states.Game.player);
    }
  }

  this.cancelWork();
}
