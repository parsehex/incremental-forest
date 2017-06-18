import { clamp, wrap } from '../../../../utils';
import inform from '../../../../ui/inform';
import itemPrices from '../../../../game-data/item-prices';
import { items, money } from '../../../../game-data/player-items';

import setup from './setup';

export default class Inventory {
  constructor(game) {
    this.game = game;

    this.money = money;
    this.items = items;

    this.slots = [ null, null, null, null, null, null, null, null ];
    this.selectedSlot = null;

    setup.call(this);
    // init money counter
    inform.player.inventory.itemValue('money', this.money.value);

    this.seek = this.seek.bind(this);
  }

  addToSlots(itemName) {
    if (this.slots.includes(itemName)) return;

    const freeSlotNum = this.slots.indexOf(null);

    if (freeSlotNum < 0) return; // FIXME before adding more than 2 more items to game

    const value = this.items[itemName].value;

    this.slots[freeSlotNum] = itemName;

    inform.player.inventory.slots.add(freeSlotNum, itemName, value);
  }

  removeFromSlots(itemName) {
    if (!this.slots.includes(itemName)) return;

    const itemSlotNum = this.slots.indexOf(itemName);

    this.slots[itemSlotNum] = null;

    inform.player.inventory.slots.remove(itemSlotNum, itemName);
  }

  get selected() {
    return this.slots[this.selectedSlot];
  }

  select(slotNum) {
    this.selectedSlot = clamp(slotNum, 0, this.slots.length - 1);

    inform.player.inventory.slots.select(slotNum);
  }

  seek(direction) {
    const nextSlot = this.selectedSlot + (direction === 'next' ? 1 : -1);
    this.select(wrap(nextSlot, this.slots.length));
  }

  sell(slotNum, amount) {
    if (typeof slotNum !== 'number') slotNum = this.selectedSlot;

    const slot = this.slots[slotNum];

    const item = this.items[slot];
    if (slot === null || !item || !item.sellable) return;

    if (item.value < amount) return;

    amount = amount || item.value;

    item.value -= amount;
    this.money.value += itemPrices.sell[slot] * amount;
  }
}
