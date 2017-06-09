import Phaser from 'phaser';

import { directionToWASD } from '../../../utils';

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
}

function checkMoveKeys(callback, key) {
  const keys = this.game.state.states.Game.keys;
  const directionKey = directionToWASD(key);

  const adjKey = directionKey || key;

  if (keys[adjKey].isDown) {
    callback(key);
  }
}

function checkKey(callback, key, arg) {
  const keys = this.game.state.states.Game.keys;

  if (keys[key].justPressed()) {
    callback(arg);

    loop.call(this, keys, key, callback, arg);
  }
}

function loop(keys, key, callback, arg) {
  this.game.time.events.add(Phaser.Timer.SECOND / 5, function() {
    if (!keys[key].isDown) return;

    callback(arg);

    loop.call(this, keys, key, callback, arg);
  }, this);
}
