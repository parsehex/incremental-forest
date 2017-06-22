import { bindItemSlot } from '../bind-item';
import setupMenus from './menus';
import setupKeys from './keys';

export default function() {
  // const carryingEl = document.getElementById('carrying');
  // const hintEl = document.getElementById('hint');
  // const inventoryEl = document.getElementById('inventory');

  setupItems.call(this);

  setupKeys.call(this);

  setupMenus.call(this);

  // setup tippy on top-menu
  Tippy('#top-menu #money, #top-menu #debt');

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
