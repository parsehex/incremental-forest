import { clamp, wrap } from '../../../../utils';
import { addInventoryItem, selectSlot } from '../../../../ui';
import itemPrices from '../../../../item-prices';

import items, { money } from './items';
import setup from './setup';

export default class Inventory {
  constructor(game) {
    this.game = game;

    this.money = money;
    this.items = items;

    this.slots = [ null, null, null, null, null, null, null, null ];
    this.selectedSlot = null;

    setup.call(this);

    this.seek = this.seek.bind(this);
  }

  addToSlots(itemName) {
    const freeSlotNum = this.slots.indexOf(null);

    if (freeSlotNum < 0) return; // FIXME before adding more than 2 more items to game

    const value = this.items[itemName].value;

    this.slots[freeSlotNum] = itemName;

    addInventoryItem(freeSlotNum, itemName, value);
  }

  get selected() {
    return this.slots[this.selectedSlot];
  }

  select(slotNum) {
    this.selectedSlot = clamp(slotNum, 0, this.slots.length - 1);

    selectSlot(slotNum);
  }

  seek(direction) {
    const nextSlot = this.selectedSlot + (direction === 'next' ? 1 : -1);
    this.select(wrap(nextSlot, this.slots.length));
  }

  sell(slotNum, amount) {
    // TODO handle amount
    if (slotNum === undefined) slotNum = this.selectedSlot;

    const slot = this.slots[slotNum];

    const item = this.items[slot];
    if (slot === null || !item || !item.sellable || item.value <= 0) return;

    item.value--;
    this.money.value += itemPrices.sell[slot];
  }
}
