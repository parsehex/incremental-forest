import { setupPause } from './pause';

import watchKeys from './keys';
import watchControls from './controls';

export const buttons = {
  up: 87, left: 65, down: 83, right: 68,
  interact: 32, sell: 76, pause: 80,
  hire: 72, fire: 70, prev: 81, next: 69,
};

// list all keys and their states
export const keys = {
  87: false, // W
  65: false, // A
  83: false, // S
  68: false, // D
  32: false, // SPACE
  76: false, // L
  80: false, // P
  72: false, // H
  70: false, // F
  81: false, // Q
  69: false, // E

  49: false, // 1
  50: false, // 2
  51: false, // 3
  52: false, // 4
  53: false, // 5
  54: false, // 6
  55: false, // 7
  56: false, // 8
};
for (let key in keys) {
  resetKey(key);
}

export function resetKey(key) {
  if (typeof keys[key] === 'boolean') keys[key] = {};

  keys[key].down = false; // is true as long as key is down
  keys[key].justDown = false; // is true for first keydown event; is reset once keyup is fired (like phaser's justPressed())
  keys[key].downFor = 0; // how long key has been held down for
  keys[key].shift = false; // is true if shift is down while this key is down
  keys[key]._last = null; // internal timestamp of last event, for timing purposes
}

export default function setupKeys() {
  setupPause.call(this);

  // TODO check for touch controls; watch them if so
  // feed watchKeys a change callback
  watchKeys(keys, (changedKey) => {
    watchControls.call(this, buttons, keys, changedKey);
  });
}
