import { updateInventory, addInventoryItem, removeInventoryItem } from '../../ui';
import { clamp, REALLY_BIG_NUMBER } from '../../utils';

export default class Inventory {
  constructor(game) {
    this.game = game;

    this.carryingList = {
      money: {
        name: 'Money',
        value: 0,
        max: REALLY_BIG_NUMBER,
      },
    };
    this.itemsList = {
      woodAxe: {
        name: 'Wood Axe',
        value: true,
      },
      bucket: {
        name: 'Bucket',
        value: false,
      },
      water: {
        name: 'Water',
        value: 0,
        max: 15,
      },
      logs: {
        name: 'Logs',
        value: 0,
        max: 10,
      },
      pineCones: {
        name: 'Pine Cone',
        value: 0,
        max: 100,
      },
    };

    this.items = {};
    createGettersSetters(this.itemsList, this.items);

    this.carrying = {};
    createGettersSetters(this.carryingList, this.carrying);

    // add items we started with to ui
    for (let itemName in this.itemsList) {
      let value = this.items[itemName];

      if (value === false || value === 0) continue;

      addInventoryItem(this.itemsList[itemName].name);
    }
  }

  get isMax() {
    const itemsMax = {};

    const items = Object.keys(this.itemsList);

    for (let i = 0; i < items.length; i++) {
      const itemValue = this.items[items[i]];

      if (typeof itemValue !== 'number') continue;

      itemsMax[items[i]] = itemValue >= this.itemsList[items[i]].max;
    }

    return itemsMax;
  }
}

function createGettersSetters(sourceObj, obj) {
  const keys = Object.keys(sourceObj);

  for (let i = 0; i < keys.length; i++) {
    Object.defineProperty(obj, keys[i], {
      get: function() { return this.value; }.bind(sourceObj[keys[i]]),
      set: function(value) {
        if (typeof this.value !== 'number') this.value = value;

        this.value = clamp(value, 0, this.max || REALLY_BIG_NUMBER);

        updateInventory(this.name, this.value);
      }.bind(sourceObj[keys[i]]),
    });
  }
}
