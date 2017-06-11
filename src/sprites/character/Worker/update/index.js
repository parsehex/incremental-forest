import Phaser from 'phaser';

import findWork from '../find-work';
import doWork from '../do-work';
import followPath from './follow-path';

export default function update() {
  if (this.moving) return; // don't try to do anything while moving

  this.lastTime = this.lastTime || this.game.time.totalElapsedSeconds(); // default lastTime to now

  let diff = this.game.time.totalElapsedSeconds() - this.lastTime;
  if (diff < this.speed) return; // hasn't been long enough; wait

  if (!this.working) {
    findWork.call(this);
  }

  if (this.working && this.path.length === 0) {
    doWork.call(this);
    return;
  }

  followPath.call(this);

  this.lastTime = this.game.time.totalElapsedSeconds();
}
