import { clamp, REALLY_BIG_NUMBER } from '../../../../utils';
import inform from '../../../../ui/inform';
import { save } from '../../../../save';

export default function setValue(itemName, thisInventory, keyName, privName, value) {
  if (typeof this[privName] !== 'number') {
    this[privName] = value;
  } else {
    // keyName will be either 'value' or 'rank'
    let max = keyName === 'value' ? this.max : 24;

    this[privName] = clamp(value, 0, max);
  }

  switch (keyName) {
    case 'value': {
      inform.player.inventory.itemValue(itemName, value);

      if (itemName === 'money') {
        save('money', value);
        return;
      }

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
