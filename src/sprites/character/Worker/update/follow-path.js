import { tileToPixel } from '../../../../tiles';
import checkCollide from '../../../../collisions';
import { nextCoord } from '../../../../utils';

import move from './move';

export default function followPath() {
  if (this.path.length === 0) {
    // there's no path to follow
    return;
  } else if (this.path.length === 1) {
    // we're at end of path; face the next direction 9instead of moving to it)
    this.face(this.path[0]);
    this.path = [];
    return;
  }

  const collision = checkCollide(tileToPixel(nextCoord(this.tile, this.path[0], 1)));

  if (!collision.collides) {
    move.call(this, this.path[0]); // move according to next path direction

    this.path.shift(); // remove first path item
  } else {
    // path is blocked; reset path and don't try to recalculate
    // TODO could check if collision is a tree and chop it down if so
    this.cancelWork(true);
  }
}
