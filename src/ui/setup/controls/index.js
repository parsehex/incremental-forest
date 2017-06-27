import { setupPause } from './pause';

import watchKeys from './keys';
import watchControls from './controls';

let savedControls = localStorage.getItem('controls');
if (savedControls) savedControls = JSON.parse(savedControls);

export const buttons = savedControls || {
  up: 87, left: 65, down: 83, right: 68,
  interact: 32, sell: 76, pause: 80,
  hire: 72, fire: 70, prev: 81, next: 69,
};

// list all keys and their states
export const keys = {
  // these controls are not modifiable
  49: false, // 1
  50: false, // 2
  51: false, // 3
  52: false, // 4
  53: false, // 5
  54: false, // 6
  55: false, // 7
  56: false, // 8
};
for (let button in buttons) {
  resetKey(buttons[button]);
}

export function resetKey(key) {
  if (!keys.hasOwnProperty(key)) keys[key] = {};

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

export function saveButtons() {
  localStorage.setItem('controls', JSON.stringify(buttons));
}
