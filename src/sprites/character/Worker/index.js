import CommonCharacter from '../Common';
import frames from '../../../sprite-frames';
import config from '../../../config';
import salaries from '../../../worker-salaries';

import update from './update';

export default class extends CommonCharacter {
  constructor({ game, x, y }) {
    super(game, x, y, 'worker', frames.CHARACTER.STAND_DOWN, null, 'worker');

    this.faceDirection = 'DOWN';

    // make a static inventory
    this.inventory = {
      selected: 'wood-axe',
    };

    this.waitLastTime = this.game.gameTime;

    this.working = false;
    this.path = [];
    this.noPath = false;
    this.speed = config.test ? 0.4 : 1.5;

    this.salary = salaries.worker;
    this.payTime = 180; // seconds

    this.sendToBack();

    this.update = update.bind(this);

    this.pathFindWorker = new Worker('../web-worker/path-find.js');

    this.getPaid();
  }

  get waiting() {
    if (this.moving) return true;

    let diff = this.game.gameTime - this.waitLastTime;
    if (diff < this.speed) return true;

    return false;
  }

  wait() {
    const oldTime = this.waitLastTime;
    this.waitLastTime = this.game.gameTime;

    this.timeSincePaid += this.waitLastTime - oldTime;

    if (this.timeSincePaid >= this.payTime) this.getPaid(); // pay every 3 minutes
  }

  getPaid() {
    const player = this.game.state.states.Game.player;

    if (player.inventory.money.value >= this.salary) {
      player.inventory.money.value -= this.salary;

      this.timeSincePaid = 0;
    } else {
      this.destroy();
    }
  }

  cancelWork(noPath) {
    this.working = false;
    this.path = [];
    this.noPath = !!noPath;
  }

  destroy() {
    this.pathFindWorker.terminate();

    super.destroy();
  }
}
