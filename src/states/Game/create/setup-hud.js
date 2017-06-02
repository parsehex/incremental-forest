export default function setupHUD() {
  const carryingEl = document.getElementById('carrying');
  const hintEl = document.getElementById('hint');
  const inventoryEl = document.getElementById('inventory');

  setupItems();

  carryingEl.style.display = 'block';
  hintEl.style.display = 'block';
  inventoryEl.style.display = 'block';

  Tippy('div#carrying li', {
    hideOnClick: false
  });
}

function setupItems() {
  const inventoryEl = document.getElementById('inventory');

  const items = inventoryEl.querySelectorAll('.item');
  for (let i = 0, len = items.length; i < len; i++) {
    items[i].addEventListener('click', selectItem.bind(items[i], items));
  }
}

function selectItem(items) {
  for (let i = 0, len = items.length; i < len; i++) {
    if (items[i] === this) {
      this.classList.add('selected');

      continue;
    }

    items[i].classList.remove('selected');
  }
}
