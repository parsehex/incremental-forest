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
import { clone } from '../../utils';

import worker from './worker';
import upgrades from './upgrades';
import items from './items';

const noSaveItems = Object.keys(items);
const saveProps = ['count', 'freeCount'];

const storeItems = merge(Object.assign({}, worker, upgrades, items), load('upgrades') || {});

// calculate item prices
for (let itemName in storeItems) {
  const item = storeItems[itemName];
  if (itemName.includes('hire') && load('world.fastObjects')) {
    // make sure to increase count to however many workers were reloaded
    const workerType = itemName.replace('hire-', '');
    const workers = load('world.fastObjects').filter((type) => type === workerType);

    item.count = workers.length;
  }

  item.price = price(item);
}

export default storeItems;

export function buy(itemName) {
  const inventory = getGame().player.inventory;
  const item = storeItems[itemName];
  const itemPrice = item.price;

  if (inventory.money < itemPrice || (item.max > 0 && item.count >= item.max)) return false;

  // make sure the money is taken after the UI updates the item price
    // (which should happen from the function we return to)
  setTimeout(function() {
    inventory.money -= itemPrice;

    item.buyCallback();

    saveStore();
  });

  // we don't need to increment items that aren't actually buyable (basePrice === 0)
  if (item.basePrice > 0) {
    increment(item);
  } else {
    // decrement the item specified under item.decrement
    decrement(storeItems[item.decrement]);
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

function saveStore() {
  const itemsToSave = clone(storeItems);

  // remove items that don't need to be saved
  for (let i = 0; i < noSaveItems.length; i++) {
    delete itemsToSave[noSaveItems[i]];
  }

  // go through remaining items, remve props that don't need to be saved
  for (let itemName in itemsToSave) {
    for (let propName in itemsToSave[itemName]) {
      // only 'count' and 'freeCount' props should be saved; delete all others
      if (propName === 'count' || propName === 'freeCount') continue;

      delete itemsToSave[itemName][propName];
    }
  }

  save('upgrades', itemsToSave);
}
