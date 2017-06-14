import { clamp, REALLY_BIG_NUMBER } from '../../../../utils';
import {
  updateInventory,
  removeInventoryItem,
  selectItem,
} from '../../../../ui';

// sets up a getter-setter for 'value' prop, clamping it to obj.max
export function readWrite(obj, itemName, keyName) {
  const privName = '_' + keyName;

  obj[privName] = obj[keyName];
  delete obj[keyName];

  Object.defineProperty(obj, keyName, {
    get: function() { return this[privName]; }.bind(obj),
    set: function(name, self, value) {
      const oldValue = this[privName];
      if (typeof this[privName] !== 'number') {
        this[privName] = value;
      } else {
        this[privName] = clamp(value, 0, this.max || REALLY_BIG_NUMBER);
      }

      switch (keyName) {
        case 'value': {
          if (!oldValue && this[privName]) {
            // item value was falsy (i.e. didn't have the item)
            // now the value is truthy (i.e. we have at least one), so add it to item slots
            self.addToSlots(name);
            return;
          }
          if (this[privName] <= 0 || this[privName] === false) {
            removeInventoryItem(self.slots.indexOf(name));
          } else {
            updateInventory(self.slots.indexOf(name), name, this[privName]);
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
export function readOnly(obj, keyName) {
  const oldKeyValue = obj[keyName];

  delete obj[keyName];

  Object.defineProperty(obj, keyName, {
    get: function() { return oldKeyValue; },
  });
}
