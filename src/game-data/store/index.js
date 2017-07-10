/*
  item format:
  {Item Name}: {
    count: {Number Of Purchases Of This Item},
    basePrice: {Base Price Of This Item (won't change)},
    price: {Current Price Of This Item (calculated at runtime)},
    multiplier: {Multiplier Used To Adjust Item's Price},
    buyCallback: {Function That's Called After Money Has Been Taken To Finish The Purchase},
  }
 */

import merge from 'deepmerge';

import getGame from '../../game';
import { load, save } from '../../save';

import worker from './worker';
import upgrades from './upgrades';

const items = merge(Object.assign({}, worker, upgrades), load('upgrades') || {});

// calculate item prices
for (let itemName in items) {
  const item = items[itemName];
  if (itemName.includes('hire') && load('world.fastObjects')) {
    // make sure to increase count to however many workers were reloaded
    const workerType = itemName.replace('hire-', '');
    const workers = load('world.fastObjects').filter((type) => type === workerType);

    item.count = workers.length;
  }

  item.price = price(item);
}

export default items;

export function buy(itemName) {
  const inventory = getGame().player.inventory;
  const item = items[itemName];
  const itemPrice = item.price;

  if (inventory.money < itemPrice || (item.max > 0 && item.count >= item.max)) return false;

  // make sure the money is taken after the UI updates the item price
    // (which should happen from the function we return to)
  setTimeout(function() {
    inventory.money -= itemPrice;

    item.buyCallback();

    save('upgrades', items);
  });

  // we don't need to increment items that aren't actually buyable (basePrice === 0)
  if (item.basePrice > 0) {
    increment(item);
  } else {
    // decrement the item specified under item.decrement
    decrement(items[item.decrement]);
  }

  return true;
}

function increment(item) {
  if (item.freeCount > 0) item.freeCount--;

  item.count++;
  item.price = price(item);
}
function decrement(item) {
  item.count--;
  item.price = price(item);
}
function price(item) {
  if (item.freeCount > 0) return 0;

  return item.basePrice * Math.pow(item.multiplier, item.count);
}
