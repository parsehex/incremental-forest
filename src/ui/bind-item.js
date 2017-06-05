import itemPrices from '../item-prices';

export function bindItem(itemEl, inventory) {
  // bind to left click
  itemEl.addEventListener('click', function selectItem(itemEls, items) {
    inventory.select(this.id);
  }.bind(itemEl));

  // bind to right click
  itemEl.addEventListener('contextmenu', sellItem.bind(itemEl, inventory));
}

function sellItem(inventory, event) {
  event.preventDefault();

  const { id } = this;
  const item = inventory.items[id];

  if (item.value <= 0 || item.sellable === false) return;

  item.value--;
  inventory.money.value += itemPrices.sell[id];
}
