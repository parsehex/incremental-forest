import { notify } from '../../../notifications';
import { worker } from '../../../../game-data/worker-config';

import slots from './slots';

function itemValue(itemName, newValue) {
  // newValue can be either boolean or number

  if (itemName === 'money') return money(newValue);

  // nothing to do here if value is boolean
    // inform...slots will handle adding/removing items (which is all boolean items can do)
  if (typeof newValue === 'boolean') return;

  const itemEl = document.getElementById('item-' + itemName);

  if (!itemEl) return;

  itemEl.querySelector('.item-count').textContent = newValue;

  // don't add to slots; inventory will call inform.player.inventory.slots['add' || 'remove']
}

function money(newCount) {
  const moneyEl = document.querySelector('#money .item-count');

  const oldCount = +moneyEl.textContent;

  moneyEl.textContent = newCount;

  if (newCount === 0 && oldCount > 0) {
    notify('danger', 'You have on money!');
  }

  const hireWorkerButton = document.getElementById('hire-worker');
  if (newCount >= worker.salary) {
    hireWorkerButton.classList.remove('disabled');
  } else {
    hireWorkerButton.classList.add('disabled');
  }
}

export default {
  itemValue,
  slots,
};
