import { updateInventory, addInventoryItem, removeInventoryItem } from '../../ui';
import { clamp } from '../../utils';

export default class Inventory {
  constructor(game) {
    this.game = game;

    this.waterValue = 0;
    this.logsValue = 0;

    this.itemsList = {
      wood_axe: true,
      bucket: false,
    };

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

  get logs() { return this.logsValue; }
  set logs(value) {
    this.logsValue = clamp(value, 0, 15); //  should clamp to limit specified in contructor

    updateInventory('logs', this.logsValue);
  }

  get water() { return this.waterValue; }
  set water(value) {
    this.waterValue = clamp(value, 0, 15); //  should clamp to limit specified in contructor

    updateInventory('water', this.water);
  }
}
