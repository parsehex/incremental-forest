import { fastMap, fastObjects } from '../../../world';
import { clone, nextCoord } from '../../../utils';
import { collidableObjects } from '../../../collisions';
import config from '../../../config';

export default function findWork() {
  if (this.working || this.waitingOnPath) return;

  const collidables = collidableObjects.concat(['chopper', 'collector', 'planter']);

  const worker = this.pathFindWorker;
  const workerArgs = [
    fastMap, fastObjects, collidables,
    config.mapWidth, config.mapHeight,
    this.tile, 'tree', // start, target
  ];

  this.waitingOnPath = true;
  worker.postMessage(workerArgs);
  worker.onmessage = (event) => {
    const pathToTree = event.data;

    if (pathToTree) {
      this.path = pathToTree;

      this.noPath = false;
      this.working = true;
    } else {
      // no available path to any trees
      this.cancelWork(true);
    }
    this.waitingOnPath = false;
  };

  // if a path to a tree can't be found, worker will try again next time update calls it
}