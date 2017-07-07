import setupMenu from '../../menu';
import getGame from '../../../game';
import store, { buy } from '../../../game-data/store';

export default function setup() {
  const inventory = getGame().player.inventory;

  for (let itemName in store) {
    const item = store[itemName];
    const buttonEl = document.getElementById('buy-' + itemName);

    updatePrice(itemName, item);

    // if player can't afford this or is maxed, disable button
    // NOTE if item.max is 0 then another part of code handles disabling the button
    if (item.max === 0) {
    } else if (inventory.money >= item.price && item.count < item.max) {
      buttonEl.classList.remove('disabled');
    } else {
      buttonEl.classList.add('disabled');
    }

    upgrade(itemName, function(event) {
      // don't do anything if button is disabled
      if (event.target.classList.contains('disabled')) return;

      if (!buy(itemName)) return;

      // purchase successful; update item's price
      updatePrice(itemName, item); // TODO item.price updates on its own, right?
    });
  }
}

function upgrade(name, handler) {
  document.getElementById('buy-' + name).addEventListener('click', handler);
}

export function updatePrice(itemName, item) {
  item = item || store[itemName];

  if (item.basePrice === 0) return; // item has no price

  const priceSpan = document.querySelector('#buy-' + itemName + ' span.price');

  if (item.count >= item.max) {
    // item is maxed out; disable button
    priceSpan.parentNode.classList.add('disabled');
  }

  let newPrice = item.price;

  if (newPrice === 0) {
    priceSpan.textContent = 'FREE';
    return;
  }

  if (Math.round(newPrice) !== newPrice) newPrice = newPrice.toFixed(2);

  priceSpan.textContent = '$' + newPrice;
}
