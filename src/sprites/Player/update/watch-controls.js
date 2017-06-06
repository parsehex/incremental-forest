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

  let pressed;
  if (key === 'SPACE') {
    pressed = keys[key].justPressed();
  } else {
    const directionKey = directionToWASD(key);
    pressed = keys[key].justPressed() || keys[directionKey].justPressed();
  }


  if (pressed) {
    callback(key);

    if (this.timers[key]) return;

    this.timers[key] = this.game.time.events.loop(Phaser.Timer.SECOND / 5, function() {
      if (
        !keys[key].isDown ||
        (typeof directionKey !== 'undefined' && keys[directionKey].justPressed())
      ) {
        this.timers[key].timer.destroy();
        this.timers[key] = null;
        return;
      }

      callback(key);
    }, this);
  }
}
