import bindMenu from '../bind-menu';
import { buttons, keys } from '../controls';

export default function setup() {
  bindMenu('settings');

  tab.call(this, 'controls');
  controls();
}

function tab(name) {
  document.getElementById(name).addEventListener('click', () => {
    const lastSelected = document.querySelector('.worker-type.selected');
    lastSelected.classList.remove('selected');
    document.getElementById(lastSelected.id + '-menu').classList.add('hidden');

    document.getElementById(name + '-menu').classList.remove('hidden');
    document.getElementById(name).classList.add('selected');
  });
}

function controls() {
  for (let button in buttons) {
    document.getElementById('controls-' + button).addEventListener('keydown', assign);
  }
}

function assign(event) {
  if (event.which === 27) return event.target.blur();

  event.stopPropagation();
  event.preventDefault();

  let keyName = event.key.toUpperCase();
  if (keyName === 'ARROWUP') {
    keyName = '↑';
  } else if (keyName === 'ARROWLEFT') {
    keyName = '←';
  } else if (keyName === 'ARROWDOWN') {
    keyName = '↓';
  } else if (keyName === 'ARROWRIGHT') {
    keyName = '→';
  }

  event.target.value = keyName;

  const button = event.target.id.replace('controls-', '');

  // rename key object to new key
  const key = keys[buttons[button]];
  delete keys[buttons[button]];
  keys[event.which] = key;

  buttons[button] = event.which;
}
