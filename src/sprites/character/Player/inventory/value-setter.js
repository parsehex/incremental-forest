import { clamp, REALLY_BIG_NUMBER } from '../../../../utils';
import inform from '../../../../ui/inform';

export default function setValue(itemName, thisInventory, keyName, privName, value) {
  if (typeof this[privName] !== 'number') {
    this[privName] = value;
  } else {
    this[privName] = clamp(value, 0, this.max || REALLY_BIG_NUMBER);
  }

  switch (keyName) {
    case 'value': {
      inform.player.inventory.itemValue(itemName, value);

      if (itemName === 'money') return;

      if (this[privName]) {
        // item value is truthy (i.e. >0 || true); add it to item slots

        thisInventory.addToSlots(itemName);
      } else {
        // item value is falsy (i.e. is 0 || false); remove item from slots

        thisInventory.removeFromSlots(itemName);
      }
      break;
    }
  }
}
