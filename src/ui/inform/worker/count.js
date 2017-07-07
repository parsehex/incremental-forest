import { updatePrice } from '../../setup/menus/store';

export default function count(type, countChange) {
  const countEl = document.getElementById(type + '-count');

  const newCount = (+countEl.textContent) + countChange;

  countEl.textContent = newCount;

  updatePrice('hire-' + type);

  const fireWorkerButton = document.getElementById('buy-fire-' + type);
  if (newCount > 0) {
    fireWorkerButton.classList.remove('disabled');
  } else {
    fireWorkerButton.classList.add('disabled');
  }
}
