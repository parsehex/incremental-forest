import { bindItemSlot } from '../bind-item';
import bindMenu from './bind-menu';
import setupMenus from './menus';
import setupControls from './controls';

export default function() {
  // const carryingEl = document.getElementById('carrying');
  // const hintEl = document.getElementById('hint');
  // const inventoryEl = document.getElementById('inventory');

  setupItems.call(this);

  setupControls.call(this);

  setupMenus.call(this);

  // setup tippy on top-menu
  Tippy('#top-menu #money, #top-menu #debt-amt');

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
