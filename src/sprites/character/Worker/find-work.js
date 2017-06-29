import { fastMap, fastObjects } from '../../../world';
import { clone, nextCoord } from '../../../utils';
import { collidableObjects } from '../../../collisions';
import config from '../../../config';

import workerPool from '../../../worker-pool';

export default function findWork() {
  if (this.working || this.waitingOnPath) return;

  const collidables = collidableObjects.concat(['chopper', 'collector', 'planter']);

  const workerArgs = [
    fastMap, fastObjects, collidables,
    config.mapWidth, config.mapHeight,
    this.tile, this.targetObjects,
    true,
  ];

  this.waitingOnPath = true;
  workerPool.addTask(workerArgs, (pathToTree) => {
    if (pathToTree) {
      this.path = pathToTree;

      this.working = true;
    } else {
      // no available path to any trees
      this.cancelWork();

      this.idle();
    }
    this.waitingOnPath = false;
  });

  // if a path to a tree can't be found, worker will try again next time update calls it
}
