import Worker from '../Worker';
import salaries from '../../../worker-salaries';

import { availableTileNear } from '../../../world';
import { tileToPixel } from '../../../tiles';

export default function hireWorker() {
  if (this.inventory.money.value < salaries.worker) return;

  // will default to this.tile if no other available tiles
  const workerTileCoord = availableTileNear(this.tile, true);
  const workerPixelCoord = tileToPixel(workerTileCoord);

  new Worker({
    game: this.game,
    x: workerPixelCoord.x,
    y: workerPixelCoord.y,
  });
}
