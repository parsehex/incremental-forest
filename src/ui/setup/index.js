import { bindItemSlot } from '../bind-item';
import setupWorkers from './worker-menu';
import setupKeys from './keys';

export default function() {
  // const carryingEl = document.getElementById('carrying');
  // const hintEl = document.getElementById('hint');
  // const inventoryEl = document.getElementById('inventory');

  setupItems.call(this);

  setupKeys.call(this);

  setupWorkers.call(this);

  // TODO setup shortcuts (that are related to DOM, like pause)

  // carryingEl.style.display = 'block';
  // hintEl.style.display = 'block';
  // inventoryEl.style.display = 'block';
}

function setupItems() {
  // player's inventory creates the item elements
  const playerInventory = this.game.state.states.Game.player.inventory;

  const inventoryEl = document.getElementById('inventory');

  const itemEls = inventoryEl.querySelectorAll('.item-slot');
  for (let i = 0, len = itemEls.length; i < len; i++) {
    bindItemSlot(i, playerInventory);
  }
}
