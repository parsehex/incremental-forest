import {
  updateInventory,
  addInventoryItem,
  removeInventoryItem,
  selectItem,
} from '../../../ui';
import { clamp, REALLY_BIG_NUMBER, clone } from '../../../utils';

import PineCone from '../../object/PineCone';

export default class Inventory {
  constructor(game) {
    this.game = game;

    this.money = {
      value: 0,
      max: REALLY_BIG_NUMBER,
    };

    this.items = {
      'wood-axe': {
        name: 'Wood Axe',
        value: true,
        sellable: false,
        selected: true,
      },
      bucket: {
        name: 'Bucket',
        value: false,
        sellable: false,
        selected: false,
      },
      water: {
        name: 'Water',
        value: 0,
        max: 15,
        sellable: false,
        selected: null,
      },
      log: {
        value: 0,
        max: 10,
        sellable: true,
        selected: null,
      },
      'pine-cone': {
        value: 0,
        max: 100,
        sellable: true,
        selected: false,
        place: PineCone,
      },
    };

    setupObj = setupObj.bind(this);

    setupObj(this.items);
    setupObj(this.money, 'money');

    // add items we started with to ui
    for (let itemName in this.items) {
      let value = this.items[itemName].value;

      if (value === false || value <= 0) continue;

      value = typeof value === 'boolean' ? undefined : value;

      const { sellable, selected } = this.items[itemName];

      addInventoryItem.call(this, itemName, value, sellable, selected);
    }

    this.seek = this.seek.bind(this);
  }

  get selected() {
    for (let name in this.items) {
      if (this.items[name].selected) return name;
    }
  }

  select(id) {
    if (this.items[id].selected || this.items[id].selected === null) return; // already selected or not selectable

    for (let name in this.items) {
      let item = this.items[name];

      if (!item.selected) continue;

      item.selected = false;
    }

    this.items[id].selected = true;
  }

  seek(direction) {
    const names = Object.keys(this.items).filter(function(itemName) {
      let item = this.items[itemName];

      return item.selected !== null && (item.value > 0 || item.value === true);
    }.bind(this));

    let i = names.indexOf(this.selected) + (direction === 'next' ? 1 : -1);
    i = wrap(i, names.length);

    const newName = names[i];

    this.select(newName);
  }
}

function wrap(value, length) {
  if (value < 0) return length - 1;
  if (value >= length) return 0;
  return value;
}

// set 'values' prop to read/write (clamped to max if present) and all other props to read only
function setupObj(obj, objName) {
  processObject = processObject.bind(this);

  if (objName === undefined) {
    const itemNames = Object.keys(obj);

    for (let i = 0; i < itemNames.length; i++) {
      processObject(obj[itemNames[i]], itemNames[i]);
    }
  } else {
    processObject(obj, objName);
  }


  function processObject(item, itemName) {
    for (let keyName in item) {
      if (keyName === 'value' || keyName === 'selected') { // TODO make work with selected too
        readWriteKey.call(this, item, itemName, keyName);
      } else {
        readKey(item, keyName);
      }
    }

    Object.defineProperty(item, 'isMax', { get: isMax.bind(item) });
  }
}

function isMax() {
  let maxed = false;

  const { value, max } = this;

  const type = typeof value;

  if (type === 'number') {
    maxed = value >= max;
  } else if (type === 'boolean') {
    maxed = value;
  }

  return maxed;
}

// sets up a getter-setter for 'value' prop, clamping it to obj.max
function readWriteKey(obj, itemName, keyName) {
  const privName = '_' + keyName;

  obj[privName] = obj[keyName];
  delete obj[keyName];

  Object.defineProperty(obj, keyName, {
    get: function() { return this[privName]; }.bind(obj),
    set: function(name, self, value) {
      if (typeof this[privName] !== 'number') {
        this[privName] = value;
      } else {
        this[privName] = clamp(value, 0, this.max || REALLY_BIG_NUMBER);
      }

      switch (keyName) {
        case 'value': {
          if (this[privName] <= 0 || this[privName] === false) {
            removeInventoryItem(name);

            self.select('wood-axe'); // default back to wood-axe
          } else {
            updateInventory.call(self, name, this[privName], this.sellable);
          }
          break;
        }
        case 'selected': {
          selectItem(name, this[privName]);
          break;
        }
      }
    }.bind(obj, itemName, this),
  });
}

// sets up a getter only for 'key' prop, making it read-only
function readKey(obj, keyName) {
  const oldKeyValue = obj[keyName];

  delete obj[keyName];

  Object.defineProperty(obj, keyName, {
    get: function() { return oldKeyValue; },
  });
}
