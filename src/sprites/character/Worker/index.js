import CommonCharacter from '../Common';
import frames from '../../../sprite-frames';
import config from '../../../config';

import update from './update';

export default class extends CommonCharacter {
  constructor({ game, x, y }) {
    super(game, x, y, 'worker', frames.CHARACTER.STAND_DOWN, null, 'worker');

    this.faceDirection = 'DOWN';

    // make a static inventory
    this.inventory = {
      selected: 'wood-axe',
    };

    this.waitLastTime = this.game.time.totalElapsedSeconds();

    this.working = false;
    this.path = [];
    this.noPath = false;
    this.speed = config.test ? 0.4 : 1.5;

    this.sendToBack();

    this.update = update.bind(this);

    this.pathFindWorker = new Worker('../web-worker/path-find.js');
  }

  get waiting() {
    if (this.moving) return true;

    let diff = this.game.time.totalElapsedSeconds() - this.waitLastTime;
    if (diff < this.speed) return true;

    return false;
  }

  wait() {
    this.waitLastTime = this.game.time.totalElapsedSeconds();
  }

  cancelWork(noPath) {
    this.working = false;
    this.path = [];
    this.noPath = !!noPath;
  }
}
