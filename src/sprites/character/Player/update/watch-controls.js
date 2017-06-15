import Phaser from 'phaser';

import { directionToWASD } from '../../../../utils';

export default function(moveCallback, interactCallback) {
  const checkMove = checkMoveKeys.bind(this, moveCallback);

  // early-return if any single key is being pressed
  if (checkMove('UP')) {
    return;
  }
  if (checkMove('LEFT')) {
    return;
  }
  if (checkMove('DOWN')) {
    return;
  }
  if (checkMove('RIGHT')) {
    return;
  }

  checkKey.call(this, interactCallback, 'SPACE');

  checkKey.call(this, this.inventory.seek, 'Q', 'previous');
  checkKey.call(this, this.inventory.seek, 'E', 'next');

  checkKey.call(this, this.hireWorker, 'H');

  checkKey.call(this, (arg, key) => {
    const amount = key.shiftKey ? null : 1;

    this.inventory.sell(null, amount);
  }, 'L');
}

function checkMoveKeys(callback, key) {
  const keys = this.game.state.states.Game.keys;
  const directionKey = directionToWASD(key);

  if (keys[key].isDown || keys[directionKey].isDown) {
    callback(key);
  }
}

function checkKey(callback, key, arg) {
  const keys = this.game.state.states.Game.keys;

  if (keys[key].justPressed()) {
    callback(arg, keys[key]);
  }
}
