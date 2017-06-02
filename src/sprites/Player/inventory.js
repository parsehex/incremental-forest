import { updateInventory, addInventoryItem, removeInventoryItem } from '../../ui';
import { clamp } from '../../utils';

export default class Inventory {
  constructor(game) {
    this.game = game;

    this.carrying = {
      water: 0,
      logs: 0,
      money: 0,
    };

    this.itemsList = {
      wood_axe: true,
      bucket: false,
    };

    // add items we started with have to ui
    for (let item in this.itemsList) {
      if (!this.itemsList[item]) continue;

      addInventoryItem(item);
    }
  }

  get items() { return this.itemsList; }
  set items(value) { throw new Error("don't directly set items list, use .addItem or .removeItem"); }
  addItem(name) {
    this.itemsList[name] = true;

    addInventoryItem(item);
  }
  removeItem(name) {
    this.itemsList[name] = false;

    removeInventoryItem(item);
  }

  get water() { return this.getCarryingItemValue('water'); }
  set water(value) { this.setCarryingItemValue('water', value, 15); }

  get logs() { return this.getCarryingItemValue('logs'); }
  set logs(value) { this.setCarryingItemValue('logs', value, 10); }

  get money() { return this.getCarryingItemValue('money'); }
  set money(value) { this.setCarryingItemValue('money', value, 1000000000); }

  getCarryingItemValue(name) {return this.carrying[name]; }
  setCarryingItemValue(name, value, max) {
    this.carrying[name] = clamp(value, 0, max || 15);

    updateInventory(name, this.carrying[name]);
  }
}
