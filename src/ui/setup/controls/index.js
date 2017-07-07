import { isTouchDevice } from '../../../utils';

import { setupPause } from './pause';
import setupTouch from './touch';
import watchKeys from './keys';
import watchControls from './controls';

let savedControls = localStorage.getItem('controls');
if (savedControls) savedControls = JSON.parse(savedControls);

export const buttons = savedControls || {
  up: 87, left: 65, down: 83, right: 68,
  interact: 32, sell: 76, pause: 80,
  prev: 81, next: 69,
};

// list all keys and their states
export const keys = {
  // these controls are not modifiable
  49: false, // 1
  50: false, // 2
  51: false, // 3
  52: false, // 4
};
const keysList = Object.keys(keys).concat(Object.keys(buttons).map((k) => buttons[k]));
for (let i = 0; i < keysList.length; i++) {
  resetKey(keysList[i]);
}

export function resetKey(key) {
  if (!keys.hasOwnProperty(key) || typeof keys[key] === 'boolean') keys[key] = {};

  keys[key].down = false; // is true as long as key is down
  keys[key].justDown = false; // is true for first keydown event; is reset once keyup is fired (like phaser's justPressed())
  keys[key].downFor = 0; // how long key has been held down for
  keys[key].shift = false; // is true if shift is down while this key is down
  keys[key]._last = null; // internal timestamp of last event, for timing purposes
}

export default function setupKeys() {
  setupPause.call(this);

  if (!isTouchDevice()) {
    watchKeys(keys, (changedKey) => {
      watchControls.call(this, buttons, keys, changedKey);
    });
  } else {
    setupTouch.call(this.game.state.states.Game.player);
  }
}

export function saveButtons() {
  localStorage.setItem('controls', JSON.stringify(buttons));
}
