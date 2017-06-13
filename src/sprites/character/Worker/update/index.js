import Phaser from 'phaser';

import findWork from '../find-work';
import doWork from '../do-work';
import followPath from './follow-path';

export default function update() {
  if (this.waiting) return; // we're waiting before we perform another action

  if (!this.working) {
    findWork.call(this);
    return this.wait();
  }

  if (this.working && this.path.length === 0) {
    doWork.call(this);
    return this.wait();
  }

  followPath.call(this);

  this.wait();
}
