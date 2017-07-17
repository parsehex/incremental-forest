import Chopper from '../Chopper';
import Collector from '../Collector';

import objectPool from '../../../object-pool';
import workerPool from '../../../worker-pool';

import world from '../../../world';
import { collidableObjects } from '../../../collisions';
import { tileToPixel } from '../../../tiles';
import config from '../../../config';

const workerTypes = {
  chopper: Chopper,
  collector: Collector,
};

export default function hireWorker(workerType) {
  const workerArgs = [
    world.fastMap, collidableObjects,
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
    const workerPixelCoord = tileToPixel(path.x, path.y);

    const Worker = workerTypes[workerType];

    objectPool.new(workerType, Worker, {
      game: this.game,
      x: workerPixelCoord.x,
      y: workerPixelCoord.y,
    });
  });
}
