import { resetKey } from './index';

export default function watchKeys(keysList, changeCallback) {
  document.body.addEventListener('keydown', (event) => {
    if (!keysList.hasOwnProperty(event.which)) return;

    const key = keysList[event.which];

    // key.justDown should be true only once per hold
    if (!key.down) {
      key.justDown = true;
    } else {
      key.justDown = false;
    }
    key.down = true;
    key.shift = event.shiftKey;

    const newDuration = Date.now() - (key._last || Date.now()) + key.downFor;
    key._last = Date.now();
    key.downFor = newDuration;

    changeCallback(event.which);

    event.preventDefault();
  });
  document.body.addEventListener('keyup', (event) => {
    if (!keysList.hasOwnProperty(event.which)) return;

    resetKey(event.which);

    changeCallback(event.which);
  });
}
