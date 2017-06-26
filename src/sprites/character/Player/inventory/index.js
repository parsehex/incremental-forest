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

    // debugging
    window.money = this.money;

    // running total of debt
    // this.debt = 0;
    // this.debtCut = 0.1;

    this.slots = [ null, null, null, null, null, null, null, null ];
    this.selectedSlot = null;

    setup.call(this);
    // init money counter
    inform.player.inventory.itemValue('money', this.money.value);

    this.seek = this.seek.bind(this);

    this.sellMultiplier = 1;
  }

  // addDebt(amount) {
  //   this.debt += amount;
  //
  //   inform.player.inventory.debt(this.debt);
  // }
  // payDebt(amount) {
  //   if (amount > this.debt) {
  //     amount = this.debt;
  //   }
  //   if (amount > this.money.value) {
  //     amount = this.money.value;
  //   }
  //
  //   if (amount === 0) return;
  //
  //   this.debt -= amount;
  //   this.money.value -= amount;
  //
  //   inform.player.inventory.debt(this.debt);
  // }

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
    const moneyAmount = itemPrices.sell[slot] * amount;

    item.value -= amount;
    this.money.value += (moneyAmount * this.sellMultiplier);

    // if (this.debt > 0) this.payDebt(moneyAmount * this.debtCut);
  }
}
