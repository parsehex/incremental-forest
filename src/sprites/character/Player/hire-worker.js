import Chopper from '../Chopper';
import Collector from '../Collector';

import { worker } from '../../../game-data/worker-config';
import objectPool from '../../../object-pool';
import workerPool from '../../../worker-pool';

import { fastMap, fastObjects } from '../../../world';
import { clone, nextCoord } from '../../../utils';
import { collidableObjects } from '../../../collisions';
import { tileToPixel } from '../../../tiles';
import config from '../../../config';

const workerTypes = {
  chopper: Chopper,
  collector: Collector,
};

export default function hireWorker(workerType) {
  if (this.inventory.money.value < worker[workerType].deposit) return;

  // pay worker's upfront deposit
  this.inventory.money.value -= worker[workerType].deposit;

  const workerArgs = [
    fastMap, fastObjects, collidableObjects,
    config.mapWidth, config.mapHeight,
    this.tile, null,
    true, // random direction order
  ];
  workerPool.addTask(workerArgs, (path) => {
    if (!path) {
      path = {
        x: this.x,
        y: this.y,
      };
    }
    // will default to this.tile if no other available tiles
    const workerPixelCoord = tileToPixel(path);

    const Worker = workerTypes[workerType];

    objectPool.new(workerType, Worker, {
      game: this.game,
      x: workerPixelCoord.x,
      y: workerPixelCoord.y,
    });
  });
}
