import bindMenu from '../bind-menu';
import { buttons, keys, saveButtons } from '../controls';
import keyMap from '../../../key-map';
import { clear } from '../../../save';

export default function setup() {
  bindMenu('settings');

  tab.call(this, 'game-settings');
  gameSettings();

  tab.call(this, 'controls');
  controls();
}

function tab(name) {
  document.getElementById(name).addEventListener('click', () => {
    const lastSelected = document.querySelector('#settings-menu button.selected');
    lastSelected.classList.remove('selected');
    document.getElementById(lastSelected.id + '-menu').classList.add('hidden');

    document.getElementById(name + '-menu').classList.remove('hidden');
    document.getElementById(name).classList.add('selected');
  });
}

function gameSettings() {
  document.getElementById('reset').addEventListener('click', function() {
    // only clears game data; controls are stored separately
    clear();
  });
}

function controls() {
  for (let button in buttons) {
    const input = document.getElementById('controls-' + button);
    input.value = keyMap[buttons[button]];
    input.addEventListener('keydown', assign);
  }
}

function assign(event) {
  if (event.which === 27) return event.target.blur();

  event.stopPropagation();
  event.preventDefault();

  // don't allow setting the same key for more than one control
  if (Object.keys(keys).includes(event.which + '')) return;

  let keyName = event.key.toUpperCase().replace('ARROW', '');

  event.target.value = keyName;

  const button = event.target.id.replace('controls-', '');

  // rename key object to new key
  const key = keys[buttons[button]];
  delete keys[buttons[button]];
  keys[event.which] = key;

  buttons[button] = event.which;

  saveButtons();
}
