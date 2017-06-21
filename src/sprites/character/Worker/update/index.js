import followPath from './follow-path';

export default function update() {
  if (this.waiting) return; // we're waiting before we perform another action

  if (!this.working) {
    this.findWork();
    return this.wait();
  }

  if (this.working && this.path.length === 0 && this.hasOwnProperty('doWork')) {
    this.doWork.call(this);
    return this.wait();
  }

  followPath.call(this);

  this.wait();
}
