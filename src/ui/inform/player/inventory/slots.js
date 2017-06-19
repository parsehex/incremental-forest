function add(slotNum, itemName, itemValue) {
  const niceName = convertToNice(itemName);

  const itemSlot = document.getElementById('item-slot-' + slotNum);
  itemSlot.title = niceName;

  const itemEl = itemSlot.querySelector('.item');
  itemEl.id = 'item-' + itemName;

  const iconDiv = document.createElement('div');
  iconDiv.className = 'item-icon';
  itemEl.appendChild(iconDiv);

  const itemImg = document.createElement('img');
  itemImg.src = 'assets/sprites/' + itemName + '.png';
  itemImg.alt = niceName;
  iconDiv.appendChild(itemImg);

  if (typeof itemValue === 'number') {
    const countDiv = document.createElement('div');
    countDiv.className = 'item-count';
    countDiv.textContent = itemValue;
    iconDiv.appendChild(countDiv);
  }
}

function remove(slotNum) {
  if (name === 'money') return;

  const slot = document.getElementById('item-slot-' + slotNum);
  slot.title = '';

  const slotItem = slot.querySelector('.item');
  slotItem.id = '';
  slotItem.innerHTML = '';
}

function select(slotNum) {
  // deselect previous slot
  const lastSlotEl = document.querySelector('.item-slot.selected');
  if (lastSlotEl) lastSlotEl.classList.remove('selected');

  document.getElementById('item-slot-' + slotNum).classList.add('selected');
}

export default {
  add,
  remove,
  select,
};

function convertToNice(text) {
  // convert string to arry, each item separated by hyphens
  text = text.split('-');

  // capitalize the first letter of each item
  text = text.map((val) => val.substr(0, 1).toUpperCase() + val.substr(1));

  // convert array back to a string, each item separated by spaces
  text = text.join(' ');

  return text;
}
