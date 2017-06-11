import { bindItem } from '../bind-item';

export default function() {
  const carryingEl = document.getElementById('carrying');
  const hintEl = document.getElementById('hint');
  const inventoryEl = document.getElementById('inventory');

  setupItems.call(this);
  setupHire.call(this);

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

function setupHire() {
  document.getElementById('hire-worker').addEventListener('click', function() {
    this.player.hireWorker();
  }.bind(this));
}
