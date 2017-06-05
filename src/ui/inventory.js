export function updateInventory(name, value, sellable) {
  name = name.toLowerCase().replace(' ', '-');

  const elem = document.querySelector('#' + name + ' .count');

  if (elem) {
    elem.textContent = value;
  } else {
    addInventoryItem(name, value, sellable);
  }
}

export function addInventoryItem(name, count, sellable) {
  name = name.toLowerCase().replace(' ', '-');

  const itemsEl = document.querySelector('div#inventory ul#items');

  itemsEl.appendChild(item(name, count, sellable));
}

export function removeInventoryItem(name) {
  name = name.toLowerCase().replace(' ', '-');
  //
}

function item(name, count, sellable) {
  const niceName = name.replace('-', ' ');

  // click listener not being set up (is setup in game)
  const itemLi = document.createElement('li');
  itemLi.className = 'item';
  itemLi.id = name;

  const iconDiv = document.createElement('div');
  iconDiv.className = 'icon';
  itemLi.appendChild(iconDiv);

  const iconImg = document.createElement('img');
  iconImg.src = '/assets/sprites/' + name + '.png';
  iconImg.alt = name;
  iconDiv.appendChild(iconImg);

  if (typeof count === 'number') {
    const countDiv = document.createElement('count');
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
    Tippy(itemLi);
  }

  return itemLi;
}
