import devtools from '../devtools';
import { clamp } from '../utils';
import { save, load } from '../save';

import merge from 'deepmerge';

const config = {
  chopper: {
    base: 150,
    multiplier: 1.74,
  },
  collector: {
    base: 50,
    multiplier: 2.33,
  },
};

const counts = {
  chopper: 0,
  collector: 0,
};

const chopper = load('chopper-config') || {
  speed: 1.5,
};
chopper.deposit = price('chopper')

const collector = load('collector-config') || {
  speed: 1.5,
};
collector.deposit = price('collector');

const workers = { chopper, collector };

export { chopper, collector };

export function increaseSpeed(workerType) {
  workers[workerType].speed = clamp(workers[workerType].speed - 0.1, 0.5, 2);

  save(workerType + '-config', workers[workerType]);
}

let chopperWoodAxeRank = 1;
export function getWoodAxeRank() {
  return chopperWoodAxeRank;
}
export function increaseWoodAxeRank() {
  chopperWoodAxeRank = clamp(chopperWoodAxeRank + 1, 0, 24);

  save('chopper-config', chopper);
}

export function increment(itemName) {
  counts[itemName]++;
  workers[itemName].deposit = price(itemName);

  return workers[itemName].deposit;
}
export function decrement(itemName) {
  counts[itemName] = clamp(counts[itemName] - 1, 0, 999999);
  workers[itemName].deposit = price(itemName);

  return workers[itemName].deposit;
}
export function count(itemName) {
  return counts[itemName];
}

function price(itemName) {
  const item = config[itemName];

  return item.base * Math.pow(item.multiplier, counts[itemName]);
}
