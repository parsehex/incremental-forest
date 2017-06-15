import Worker from '../Worker';
import { worker } from '../../../game-data/worker-config';

import { availableTileNear } from '../../../world';
import { tileToPixel } from '../../../tiles';

export default function hireWorker() {
  if (this.inventory.money.value < worker.salary) return;

  // will default to this.tile if no other available tiles
  const workerTileCoord = availableTileNear(this.tile, true);
  const workerPixelCoord = tileToPixel(workerTileCoord);

  new Worker({
    game: this.game,
    x: workerPixelCoord.x,
    y: workerPixelCoord.y,
  });
}
