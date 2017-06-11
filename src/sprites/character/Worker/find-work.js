import { objectsAtTile } from '../../../world';
import { findPath } from '../../../path';

export default function findWork() {
  if (this.working) return;

  const pathToTree = findPath(this.tile, function(tileCoord) {
    // this will be called for all checked and walkable tiles
    // we're checking for a tree at tileCoord
    tileCoord = tileCoord.split(',');
    tileCoord = { x: tileCoord[0], y: tileCoord[1] };

    const objects = objectsAtTile(tileCoord)

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].objectType === 'tree') return true;
    }

    return false;
  });

  if (pathToTree) {
    this.path = pathToTree;

    this.onPath = true;
    this.working = true;
  }

  // if a path to a tree can't be found, worker will try again next time update calls it
}
