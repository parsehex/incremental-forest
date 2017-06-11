import Worker from '../Worker';

import { availableTileNear } from '../../../world';
import { tileToPixel } from '../../../tiles';

export default function hireWorker() {
  // will default to this.tile if no other available tiles
  const workerTileCoord = availableTileNear(this.tile, true);
  const workerPixelCoord = tileToPixel(workerTileCoord);

  new Worker({
    game: this.game,
    x: workerPixelCoord.x,
    y: workerPixelCoord.y,
  });
}
