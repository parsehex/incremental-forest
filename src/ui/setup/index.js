import { bindItem } from '../bind-item';

export default function() {
  const carryingEl = document.getElementById('carrying');
  const hintEl = document.getElementById('hint');
  const inventoryEl = document.getElementById('inventory');

  setupItems.call(this);
  setupButtons.call(this);

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
        listener = () => { console.log('fire worker'); };
        break;
      }
    }

    if (!listener) return;

    menuButtons[i].addEventListener('click', listener);
  }
}
