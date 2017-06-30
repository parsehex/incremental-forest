import CommonCharacter from '../Common';
import frames from '../../../sprite-frames';
import * as workers from '../../../game-data/worker-config';
import inform from '../../../ui/inform';
import { onChange, removeListener } from '../../../world';

import workerPool from '../../../worker-pool';

import update from './update';
import findWork from './find-work';

export default class extends CommonCharacter {
  constructor(game, x, y, sprite, id, objectType, props) {
    super(game, x, y, sprite, frames.CHARACTER.STAND_DOWN, id, objectType);

    this.speed = workers[objectType].speed;

    this.faceDirection = 'DOWN';

    this.inventory = {
      selected: null,
    };

    this.waitLastTime = this.game.gameTime;

    this.working = false;
    this.path = {};

    this.sendToBack();

    this.findWork = findWork.bind(this);

    workerPool.register();

    this.player = this.game.state.states.Game.player;

    this.timer = this.game.time.create(false);
    this.timer.loop(this.speed * 1000, () => {
      if (this.destroyed) return;

      update.call(this);
    }, this);
    this.timer.start();
    window.times = this.timer;

    inform.worker.count(objectType, 1);
  }

  get waiting() {
    if (this.moving) return true;

    return false;
  }

  wait() {
    const oldTime = this.waitLastTime;
    this.waitLastTime = this.game.gameTime;
  }

  idle() {
    // called when a worker has no available path; waits on the world to change
    this.timer.pause();

    onChange(this.id, (tileCoord, objects) => {
      if (objects.length === 0) {
        // worker might have been stuck; try to pathfind again
        removeListener(this.id);
        this.timer.resume();
        return;
      }

      // check if any objects at this tile are one of this worker's targetObjects
      for (let i = 0; i < objects.length; i++) {
        if (!this.targetObjects.includes(objects[i].objectType)) continue;

        removeListener(this.id);
        this.timer.resume();
        return;
      }
    });
  }

  cancelWork() {
    this.working = false;
    this.path = [];
  }

  resetObject() {
    super.resetObject();

    this.speed = worker[this.objectType].speed;

    this.faceDirection = 'DOWN';

    this.inventory = {
      selected: null,
    };

    this.waitLastTime = this.game.gameTime;

    this.working = false;
    this.path = {};

    this.timer.resume();

    workerPool.register();

    inform.worker.count(this.objectType, 1);
  }

  destroy() {
    this.timer.pause();

    super.destroy();

    inform.worker.count(this.objectType, -1);

    workerPool.unregister();
  }
}
