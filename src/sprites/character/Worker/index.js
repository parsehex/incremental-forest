import CommonCharacter from '../Common';
import frames from '../../../sprite-frames';
import { worker } from '../../../game-data/worker-config';
import inform from '../../../ui/inform';

import update from './update';

export default class extends CommonCharacter {
  constructor(game, x, y, sprite, id, objectType, props) {
    super(game, x, y, sprite, frames.CHARACTER.STAND_DOWN, id, objectType);

    this.salary = worker[objectType].salary;
    this.payTime = worker[objectType].payTime;
    this.speed = worker[objectType].speed;

    this.faceDirection = 'DOWN';

    // make a static inventory
    this.inventory = {
      selected: null,
    };

    this.waitLastTime = this.game.gameTime;

    this.working = false;
    this.path = [];
    this.noPath = false;

    this.sendToBack();

    this.update = update.bind(this);

    this.pathFindWorker = new Worker('web-worker/path-find.js');

    this.getPaid();

    inform.worker.count(objectType, 1);
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

    if (this.timeSincePaid >= this.payTime) this.getPaid();
  }

  getPaid() {
    const player = this.game.state.states.Game.player;

    if (player.inventory.money.value >= this.salary) {
      player.inventory.money.value -= this.salary;

      this.timeSincePaid = 0;
    } else {
      console.log('no pay');
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

    inform.worker.count(this.objectType, -1);
  }
}
