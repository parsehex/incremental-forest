import { save, load } from '../save';

export const config = {
  'wood-axe': {
    base: 14,
    multiplier: 2.93,
    max: 24,
  },
  'pine-cone': {
    base: 2.5,
    multiplier: 1.153,
    max: 75,
  },
  'sell-price': {
    base: 12,
    multiplier: 5.51,
    max: 999,
  },
  'tree-grow': {
    base: 13,
    multiplier: 1.39,
    max: 80,
  },
  'chopper-wood-axe': {
    base: 14,
    multiplier: 2,
    max: 24,
  },
  'chopper-speed': {
    base: 5,
    multiplier: 2.9,
    max: 10,
  },
  'collector-speed': {
    base: 5,
    multiplier: 2.9,
    max: 10,
  },
};

const counts = load('upgrades') || {
  'wood-axe': 0,
  'pine-cone': 0,
  'sell-price': 0,
  'tree-grow': 0,
  'chopper-wood-axe': 0,
  'chopper-speed': 0,
  'collector-speed': 0,
};

const prices = {
  'wood-axe': price('wood-axe'),
  'pine-cone': price('pine-cone'),
  'sell-price': price('sell-price'),
  'tree-grow': price('tree-grow'),
  'chopper-wood-axe': price('chopper-wood-axe'),
  'chopper-speed': price('chopper-speed'),
  'collector-speed': price('collector-speed'),
};

export default prices;

// updates upgrade count, returns new price
export function increment(itemName) {
  counts[itemName]++;
  prices[itemName] = price(itemName);

  save('upgrades', counts);

  return prices[itemName];
}
export function count(itemName) {
  return counts[itemName];
}

function price(itemName) {
  const item = config[itemName];

  return item.base * Math.pow(item.multiplier, counts[itemName]);
}
