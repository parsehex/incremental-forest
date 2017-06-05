import { bindItem } from './bind-item';

export function updateInventory(name, value, sellable) {
  const niceName = name.toLowerCase().replace('-', ' ');

  const elem = document.querySelector('#' + name + ' .count');

  if (elem) {
    elem.textContent = value;
  } else {
    addInventoryItem.call(this, name, value, sellable);
  }
}

export function addInventoryItem(name, count, sellable, selected) {
  const itemsEl = document.querySelector('div#inventory ul#items');

  itemsEl.appendChild(item.call(this, name, count, sellable, selected));
}

export function removeInventoryItem(name) {
  document.querySelector('#' + name).remove();
}

export function selectItem(itemName, selected) {
  const action = selected ? 'add' : 'remove';

  document.getElementById(itemName).classList[action]('selected');
}

function item(name, count, sellable, selected) {
  const niceName = name.replace('-', ' ');

  const itemLi = document.createElement('li');
  itemLi.className = 'item' + (selected ? ' selected' : '');
  itemLi.id = name;

  const iconDiv = document.createElement('div');
  iconDiv.className = 'icon';
  itemLi.appendChild(iconDiv);

  const iconImg = document.createElement('img');
  iconImg.src = '/assets/sprites/' + name + '.png';
  iconImg.alt = name;
  iconDiv.appendChild(iconImg);

  if (typeof count === 'number') {
    const countDiv = document.createElement('div');
    countDiv.className = 'count';
    countDiv.textContent = count;
    iconDiv.appendChild(countDiv);
  }

  const nameDiv = document.createElement('div');
  nameDiv.className = 'name';
  nameDiv.textContent = niceName;
  itemLi.appendChild(nameDiv);

  if (sellable) {
    itemLi.title = 'Right-click to sell 1 ' + niceName;
    Tippy(itemLi, {
      appendTo: itemLi,
      size: 'small',
      hideOnClick: false,
    });
  }

  bindItem(itemLi, this);

  return itemLi;
}
