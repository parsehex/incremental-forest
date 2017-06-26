import { readWrite, readOnly } from './key-access';

export default function setup() {
  for (let itemName in this.items) {
    let item = this.items[itemName];

    if (item.value === false || item.value <= 0) continue;

    this.addToSlots(itemName);
  }

  setupObj.call(this, this.items);
  setupObj.call(this, this.money, 'money');

  this.select(0);
}

// set 'values' prop to read/write (clamped to max if present) and all other props to read only
function setupObj(obj, objName) {
  processObject = processObject.bind(this);

  if (objName === undefined) {
    const itemNames = Object.keys(obj);

    for (let i = 0; i < itemNames.length; i++) {
      processObject(obj[itemNames[i]], itemNames[i]);
    }
  } else {
    processObject(obj, objName);
  }

  function processObject(item, itemName) {
    for (let keyName in item) {
      readWrite.call(this, item, itemName, keyName);
    }

    Object.defineProperty(item, 'isMax', { get: isMax.bind(item) });
  }
}

function isMax() {
  let maxed = false;

  const { value, max } = this;

  const type = typeof value;

  if (type === 'number') {
    maxed = value >= max;
  } else if (type === 'boolean') {
    maxed = value;
  }

  return maxed;
}
