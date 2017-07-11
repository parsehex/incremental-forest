import { bindItemSlot } from '../bind-item';
import setupMenus from './menus';
import setupControls from './controls';
import { isTouchDevice } from '../../utils';

export default function() {
  setupItems.call(this);

  setupControls.call(this);

  setupMenus.call(this);

  if (!isTouchDevice()) {
    // setup tippy on top-menu
    Tippy('#top-menu #money, [title]', {
      size: 'small',
      duration: 0,
      trigger: 'mouseenter',
    });
  }

  document.getElementById('menu').style.visibility = 'visible';
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
