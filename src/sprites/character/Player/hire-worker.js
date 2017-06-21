import Chopper from '../Chopper';
import Collector from '../Collector';
import Planter from '../Planter';

import { worker } from '../../../game-data/worker-config';
import objectPool from '../../../object-pool';

const workerTypes = {
  chopper: Chopper,
  collector: Collector,
  planter: Planter,
};

import { availableTileNear } from '../../../world';
import { tileToPixel } from '../../../tiles';

export default function hireWorker(workerType) {
  if (this.inventory.money.value < worker[workerType].salary) return;

  // will default to this.tile if no other available tiles
  const workerTileCoord = availableTileNear(this.tile, true);
  const workerPixelCoord = tileToPixel(workerTileCoord);

  const Worker = workerTypes[workerType];

  objectPool.new(workerType, Worker, {
    game: this.game,
    x: workerPixelCoord.x,
    y: workerPixelCoord.y,
  });
}
