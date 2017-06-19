/**
 * updates UI count of workers
 * @param  {number} countChange the amount that the workers count changed (-1 or 1); is added to previous count
 */
export default function count(type, countChange) {
  const countEl = document.getElementById(type + '-count');

  const newCount = (+countEl.textContent) + countChange;

  countEl.textContent = newCount;

  const fireWorkerButton = document.getElementById('fire-' + type);
  if (newCount > 0) {
    fireWorkerButton.classList.remove('disabled');
  } else {
    fireWorkerButton.classList.add('disabled');
  }
}
