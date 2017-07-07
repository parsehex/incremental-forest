import store from '../../../../game-data/store';

export default function money(newCount) {
  const moneyEl = document.querySelector('#money .item-count');

  const oldCount = +moneyEl.textContent;

  // if newCount is a decimal, trim it to 2 decimal places
  if (Math.round(newCount) !== newCount) newCount = newCount.toFixed(2);

  moneyEl.textContent = newCount;

  const buyButtons = document.querySelectorAll('.upgrade');
  for (let i = 0; i < buyButtons.length; i++) {
    const item = store[buyButtons[i].id.substr(4)];

    if (item.max === 0) continue;

    if (+newCount >= item.price && item.count < item.max) {
      buyButtons[i].classList.remove('disabled');
    } else {
      buyButtons[i].classList.add('disabled');
    }
  }
}
