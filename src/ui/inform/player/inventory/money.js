// import { notify } from '../../../notifications';
import { worker } from '../../../../game-data/worker-config';

export default function money(newCount) {
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
    if (newCount >= worker[hireWorkerButtons[i].id.substr(5)].deposit) {
      hireWorkerButtons[i].classList.remove('disabled');
    } else {
      hireWorkerButtons[i].classList.add('disabled');
    }
  }
}
