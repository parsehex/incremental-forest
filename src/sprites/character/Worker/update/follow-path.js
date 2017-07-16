import { tileToPixel } from '../../../../tiles';
import { quickCheckCollide } from '../../../../collisions';
import { nextCoord } from '../../../../utils';
import { fastMap } from '../../../../world';

import move from './move';

export default function followPath() {
  if (this.path.path.length === 1) {
    // we're at end of path; face the next direction 9instead of moving to it)
    this.face(this.path.path[0]);
    this.path = [];
    return;
  }

  // make sure there's still a target object where we're going
  const objectsAtTarget = fastMap[this.path.y][this.path.x];
  let stillTarget = false;
  for (let i = 0; i < objectsAtTarget.length; i++) {
    if (this.targetObjects.includes(objectsAtTarget[i])) {
      stillTarget = true;
      break;
    }
  }
  if (!stillTarget) return this.cancelWork();

  // make a list of all workers of this type
  const workers = this.game.state.states.Game.groups.character.children.filter((o) => o.objectType === this.objectType);

  // check if any workers are going to the same place as this worker
  for (let i = 0; i < workers.length; i++) {
    const worker = workers[i];
    if (worker.id === this.id || worker.path.x !== this.path.x || worker.path.y !== this.path.y) continue;

    const thisX = this.tile.x - this.path.x;
    const thisY = this.tile.y - this.path.y;
    const thisDistance = Math.sqrt( (thisX * thisX) + (thisY * thisY) );

    const workerX = worker.tile.x - worker.path.x;
    const workerY = worker.tile.y - worker.path.y;
    const workerDistance = Math.sqrt( (workerX * workerX) + (workerY * workerY) );

    // this is closer to target than worker; other worker should cancel, not this
    if (thisDistance < workerDistance) continue;

    if (thisDistance === workerDistance) {
      // break tie based on id
      const thisNum = +this.id.substr(-1, 3);
      const workerNum = +worker.id.substr(-1, 3);

      // worker with lower last 3 digits in id loses
      if (thisDistance > workerNum) continue;
    }

    // this worker should cancel its job
    this.cancelWork();
    return;
  }

  const tileCoord = nextCoord(this.tile.x, this.tile.y, this.path.path[0], 1);

  const collision = quickCheckCollide(tileCoord.x, tileCoord.y, ['chopper', 'collector', 'planter']);

  if (!collision) {
    move.call(this, this.path.path[0]); // move according to next path direction

    this.path.path.shift(); // remove first path item
  } else {
    // path is blocked
    this.cancelWork();
  }
}
