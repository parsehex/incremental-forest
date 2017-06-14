import { bindItem } from './bind-item';

export function updateInventory(slotNum, name, value) {
  const niceName = name.toLowerCase().replace('-', ' ');

  const countEl = document.querySelector('#item-slot-' + slotNum + ' .item-count');

  if (countEl) {
    countEl.textContent = value;
  } else {
    addInventoryItem(slotNum, name, value);
  }
}

export function addInventoryItem(slotNum, name, count) {
  item(slotNum, name, count);
}

export function removeInventoryItem(slotNum) {
  if (name === 'money') return;

  const slot = document.querySelector('#item-slot-' + slotNum);
  slot.title = '';
  slot.querySelector('.item').innerHTML = '';
}

export function selectSlot(slotNum) {
  // deselect previous slot
  document.querySelector('.item-slot.selected').classList.remove('selected');

  document.getElementById('item-slot-' + slotNum).classList.add('selected');
}

function item(slotTargetNum, name, count) {
  // this ugly line converts 'im-a-spooky-skeleton' to 'Im A Spooky Skeleton'
  const niceName = name.replace(/-/g, ' ').split(' ').map((val)=>val.substr(0, 1).toUpperCase() + val.substr(1)).join(' ');

  const itemSlot = document.getElementById('item-slot-' + slotTargetNum);
  itemSlot.title = niceName;

  const iconDiv = document.createElement('div');
  iconDiv.className = 'icon';
  itemSlot.querySelector('.item').appendChild(iconDiv);

  const itemImg = document.createElement('img');
  itemImg.src = 'assets/sprites/' + name + '.png';
  itemImg.alt = niceName;
  iconDiv.appendChild(itemImg);

  if (typeof count === 'number') {
    const countDiv = document.createElement('div');
    countDiv.className = 'item-count';
    countDiv.textContent = count;
    iconDiv.appendChild(countDiv);
  }
}
