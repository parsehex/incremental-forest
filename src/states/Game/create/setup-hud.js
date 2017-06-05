import itemPrices from '../../../item-prices';

export default function setupHUD() {
  const carryingEl = document.getElementById('carrying');
  const hintEl = document.getElementById('hint');
  const inventoryEl = document.getElementById('inventory');

  setupItems();
  setupCarrying.call(this);

  carryingEl.style.display = 'block';
  hintEl.style.display = 'block';
  inventoryEl.style.display = 'block';

  Tippy('div#carrying li', {
    hideOnClick: false
  });
}

function setupCarrying() {
  // TODO disabled for now ('carrying' items got relocated)
  // document.querySelector('div#carrying #logs').addEventListener('click', function() {
  //   const player = this.game.state.states.Game.player;
  //
  //   if (player.inventory.logs === 0) return;
  //
  //   player.inventory.logs--;
  //   player.inventory.money += itemPrices.LOG;
  // }.bind(this));
}

function setupItems() {
  const inventoryEl = document.getElementById('inventory');

  const items = inventoryEl.querySelectorAll('.item');
  for (let i = 0, len = items.length; i < len; i++) {
    items[i].addEventListener('click', selectItem.bind(items[i], items));
  }
}

function selectItem(items) {
  for (let i = 0, len = items.length; i < len; i++) {
    if (items[i] === this) {
      this.classList.add('selected');

      continue;
    }

    items[i].classList.remove('selected');
  }
}
