import { clamp, wrap, REALLY_BIG_NUMBER } from '../../../../utils';
import { save, load } from '../../../../save';
import inform from '../../../../ui/inform';
import itemPrices from '../../../../game-data/item-prices';
import { items, money } from '../../../../game-data/player-items';

export default class Inventory {
  constructor(game) {
    this.game = game;

    this._money = money;
    this._items = items;

    // debugging
    window.money = (val) => {this.money = val};

    this.slots = [ null, null, null, null, null, null, null, null ];
    this.selectedSlot = 0;

    // init money counter
    inform.player.inventory.itemValue('money', this.money);

    this.seek = this.seek.bind(this);

    this._sellMultiplier = load('sell-multiplier') || 1;

    for (let item in this._items) {
      if (this.get(item)) {
        this.addToSlots(item);

        inform.player.inventory.itemValue(item, this.get(item));
      }
    }
  }

  get sellMultiplier() {
    return this._sellMultiplier;
  }
  set sellMultiplier(value) {
    this._sellMultiplier = value;
    save('sell-multiplier', this._sellMultiplier);
  }

  get money() {
    return this._money;
  }
  set money(value) {
    this._money = clamp(value, 0, REALLY_BIG_NUMBER);
    inform.player.inventory.itemValue('money', this._money);

    save('money', this._money);
  }

  isMax(item) {
    return this._items[item].value >= this._items[item].max;
  }
  increment(item, prop) {
    prop = prop || 'value';

    this.set(item, prop, clamp(this.get(item, prop) + 1, 0, this.get(item, 'max') || REALLY_BIG_NUMBER));
  }
  get(item, prop) {
    prop = prop || 'value';
    return this._items[item][prop];
  }
  set(item, prop, value) {
    if (typeof value !== 'number') {
      this._items[item][prop] = value;

      save('items', this._items);
      return;
    }

    const newValue = clamp(value, 0, this._items[item].max || REALLY_BIG_NUMBER);

    this._items[item][prop] = newValue;

    if (prop === 'value') inform.player.inventory.itemValue(item, newValue);

    if (prop === 'value') {
      if (newValue) {
        this.addToSlots(item);
      } else {
        this.removeFromSlots(item);
      }
    }

    save('items', this._items);
  }

  addToSlots(itemName) {
    if (this.slots.includes(itemName)) return;

    const freeSlotNum = this.slots.indexOf(null);

    if (freeSlotNum < 0) return;

    const value = this.get(itemName);

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
    const nextSlot = this.selectedSlot + direction;
    this.select(wrap(nextSlot, this.slots.length));
  }

  sell(slotNum, amount) {
    if (typeof slotNum !== 'number') slotNum = this.selectedSlot;

    const itemName = this.slots[slotNum];

    if (itemName === null || !this.get(itemName, 'sellable')) return;

    if (this.get(itemName) < amount) return;

    amount = amount || this.get(itemName);
    const moneyAmount = itemPrices.sell[itemName] * amount;

    this.set(itemName, 'value', this.get(itemName) - amount);
    this.money += (moneyAmount * this.sellMultiplier);
  }
}
