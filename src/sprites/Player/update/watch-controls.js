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

  checkSpace.call(this, interactCallback, 'SPACE');
}

function checkMoveKeys(callback, key) {
  const keys = this.game.state.states.Game.keys;
  const directionKey = directionToWASD(key);

  const adjKey = directionKey || key;

  if (keys[adjKey].isDown) {
    callback(key);
  }
}

function checkSpace(callback, key) {
  const keys = this.game.state.states.Game.keys;

  if (keys.SPACE.justPressed()) {
    callback();

    loop.call(this, keys, callback);
  }
}

function loop(keys, callback) {
  this.game.time.events.add(Phaser.Timer.SECOND / 5, function() {
    if (!keys.SPACE.isDown) return;

    callback();

    loop.call(this, keys, callback);
  }, this);
}
