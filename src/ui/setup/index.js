import { bindItem } from '../bind-item';

export default function() {
  const carryingEl = document.getElementById('carrying');
  const hintEl = document.getElementById('hint');
  const inventoryEl = document.getElementById('inventory');

  setupItems.call(this);
  setupButtons.call(this);
  setupPause.call(this);

  carryingEl.style.display = 'block';
  hintEl.style.display = 'block';
  inventoryEl.style.display = 'block';
}

function setupItems() {
  // player's inventory creates the item elements
  const playerInventory = this.game.state.states.Game.player.inventory;

  const inventoryEl = document.getElementById('inventory');

  const itemEls = inventoryEl.querySelectorAll('.item');
  for (let i = 0, len = itemEls.length; i < len; i++) {
    bindItem(itemEls[i], playerInventory);
  }
}

function setupButtons() {
  bindMenu.call(this, 'workers');
  // bindMenu.call(this, 'settings');
}

function setupPause() {
  // button and onUnfocus
  const pauseButton = document.getElementById('pause-button');

  pauseButton.addEventListener('click', pause.bind(this, 'toggle', true));

  document.body.addEventListener('keydown', (event) => {
    if (event.which === 80) {
      pause.call(this, 'toggle', true);

      event.preventDefault();
    }
  });

  var hidden, visibilityChange;
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  document.addEventListener(visibilityChange, () => {
    if (this.game.manuallyPaused) return;

    if (document[hidden]) {
      pause.call(this, true); // force pause
    } else {
      pause.call(this, false); // force resume
    }
  }, false);

  function pause(state, manual) {
    if (state === 'toggle') {
      this.game.paused = !this.game.paused;
    } else if (typeof state === 'boolean') {
      this.game.paused = state;
    }

    this.game.manuallyPaused = manual && this.game.paused;

    pauseButton.textContent = this.game.paused ? 'Resume' : 'Pause';
  }
}

function bindMenu(name) {
  const menuEl = document.getElementById(name + '-menu');

  document.getElementById(name).addEventListener('click', () => {
    menuEl.classList.toggle('hidden');
  });

  const menuButtons = menuEl.querySelectorAll('button');

  for (let i = 0; i < menuButtons.length; i++) {
    let listener;

    switch (menuButtons[i].id) {
      case 'hire-worker': {
        listener = () => { this.player.hireWorker(); };
        break;
      }
      case 'fire-worker': {
        listener = () => { this.player.fireWorker(); };
        break;
      }
    }

    if (!listener) return;

    menuButtons[i].addEventListener('click', listener);
  }
}
