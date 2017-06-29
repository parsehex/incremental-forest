import money from './money';
import slots from './slots';

function itemValue(itemName, newValue) {
  // newValue can be either boolean or number

  if (itemName === 'money') {
    money(newValue);
    return;
  }

  // nothing to do here if value is boolean
    // inform...slots will handle adding/removing items (which is all boolean items can do)
  if (typeof newValue === 'boolean') return;

  const itemEl = document.getElementById('item-' + itemName);

  if (!itemEl) return;

  itemEl.querySelector('.item-count').textContent = newValue;

  // don't add to slots; inventory will call inform.player.inventory.slots['add' || 'remove']
}

export default {
  itemValue,
  slots,
};
