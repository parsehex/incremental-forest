// import { notify } from '../../../notifications';
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

function debt(newCount) {
  const debtEl = document.querySelector('#debt .item-count');

  const oldCount = +debtEl.textContent;

  // if newCount is a decimal, trim it to 2 demial places
  if (Math.round(newCount) !== newCount) newCount = newCount.toFixed(2);

  debtEl.textContent = newCount;
}

function money(newCount) {
  const moneyEl = document.querySelector('#money .item-count');

  const oldCount = +moneyEl.textContent;

  // if newCount is a decimal, trim it to 2 demial places
  if (Math.round(newCount) !== newCount) newCount = newCount.toFixed(2);

  moneyEl.textContent = newCount;

  // if (newCount === 0 && oldCount > 0) {
  //   notify('danger', 'You have on money!');
  // }

  const hireWorkerButtons = document.querySelectorAll('.hire-worker');
  for (let i = 0; i < hireWorkerButtons.length; i++) {
    if (newCount >= worker[hireWorkerButtons[i].id.substr(5)].salary) {
      hireWorkerButtons[i].classList.remove('disabled');
    } else {
      hireWorkerButtons[i].classList.add('disabled');
    }
  }
}

export default {
  itemValue,
  debt,
  slots,
};
