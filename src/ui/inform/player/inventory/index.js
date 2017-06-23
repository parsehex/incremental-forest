import money from './money';
// import updateDebtButtons from './update-debt-buttons';
import slots from './slots';

function itemValue(itemName, newValue) {
  // newValue can be either boolean or number

  if (itemName === 'money') {
    money(newValue);
    // updateDebtButtons(newValue);
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

// function debt(newCount) {
//   const debtEl = document.querySelector('#debt-amt .item-count');
//
//   const oldCount = +debtEl.textContent;
//
//   if (Math.round(newCount) !== newCount) newCount = newCount.toFixed(2);
//
//   debtEl.textContent = newCount;
//
//   updateDebtButtons(null, newCount);
// }

export default {
  itemValue,
  // debt,
  slots,
};
