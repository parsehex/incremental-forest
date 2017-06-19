import Chopper from '../Chopper';
import Collector from '../Collector';
import { worker } from '../../../game-data/worker-config';

const workerTypes = {
  chopper: Chopper,
  collector: Collector,
};

import { availableTileNear } from '../../../world';
import { tileToPixel } from '../../../tiles';

export default function hireWorker(workerType) {
  if (this.inventory.money.value < worker[workerType].salary) return;

  // will default to this.tile if no other available tiles
  const workerTileCoord = availableTileNear(this.tile, true);
  const workerPixelCoord = tileToPixel(workerTileCoord);

  const Worker = workerTypes[workerType];

  new Worker({
    game: this.game,
    x: workerPixelCoord.x,
    y: workerPixelCoord.y,
  });
}
