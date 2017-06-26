import * as worker from '../../../../game-data/worker-config';

export default function money(newCount) {
  const moneyEl = document.querySelector('#money .item-count');

  const oldCount = +moneyEl.textContent;

  // if newCount is a decimal, trim it to 2 decimal places
  if (Math.round(newCount) !== newCount) newCount = +newCount.toFixed(2);

  moneyEl.textContent = newCount;

  const hireWorkerButtons = document.querySelectorAll('.hire-worker');
  for (let i = 0; i < hireWorkerButtons.length; i++) {
    if (newCount >= worker[hireWorkerButtons[i].id.substr(5)].deposit) {
      hireWorkerButtons[i].classList.remove('disabled');
    } else {
      hireWorkerButtons[i].classList.add('disabled');
    }
  }

  const upgradeButtons = document.querySelectorAll('.upgrade');
  for (let i = 0; i < upgradeButtons.length; i++) {
    if (newCount >= upgradeButtons[i].dataset.price) {
      upgradeButtons[i].classList.remove('disabled');
    } else {
      upgradeButtons[i].classList.add('disabled');
    }
  }
}
