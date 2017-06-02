export function updateInventory(name, value) {
  const elem = document.querySelector('div#carrying #' + name + '#value');

  elem.textContent = value;
}

export function addInventoryItem(name) {
  const itemsEl = document.querySelector('div#inventory ul#items');

  itemsEl.appendChild(item(name));
}

export function removeInventoryItem(name) {
  //
}

function item(name) {
  name = name.replace('_', '-');

  const itemLi = document.createElement('li');
  itemLi.className = 'item';
  itemLi.id = 'item-' + name;

  const iconDiv = document.createElement('div');
  iconDiv.className = 'icon';

  const iconImg = document.createElement('img');
  iconImg.src = '/assets/images/' + name + '.png';
  iconImg.alt = name;

  const nameDiv = document.createElement('div');
  nameDiv.className = 'name';
  nameDiv.textContent = name.replace('-', ' ');

  itemLi.appendChild(iconDiv);
  iconDiv.appendChild(iconImg);

  itemLi.appendChild(nameDiv);

  return itemLi;
}
