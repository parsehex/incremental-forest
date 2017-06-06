import Phaser from 'phaser';

import frames from '../../../sprite-frames';
import { directionToWASD } from '../../../utils';

export default function(moveCallback, interactCallback) {
  checkKey = checkKey.bind(this);

  const checkMove = checkKey.bind(this, moveCallback);

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

  if (checkKey(interactCallback, 'SPACE')) {
    return;
  }
}

function checkKey(callback, key) {
  const keys = this.game.state.states.Game.keys;
  const directionKey = directionToWASD(key);

  const adjKey = directionKey || key;

  let pressed = keys[adjKey].justPressed();

  if (adjKey !== 'SPACE') {
    pressed = pressed || keys[directionKey].justPressed();
  }

  if (pressed) {
    callback(key);

    loop.call(this, keys, adjKey, callback, key);
  }
}

function loop(keys, name, callback, callbackArg) {
  this.game.time.events.add(Phaser.Timer.SECOND / 5, function() {
    if (!keys[name].isDown) return;

    callback(callbackArg);

    loop.call(this, keys, name, callback, callbackArg);
  }, this);
}
