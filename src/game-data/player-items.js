import devtools from '../devtools';
import { REALLY_BIG_NUMBER } from '../utils';
import { load } from '../save';

import merge from 'deepmerge';

import PineCone from '../sprites/object/PineCone';

const itemMax = 500;

const loadedItems = load('items') || {};
const defaultItems = {
  'wood-axe': {
    value: true,
    rank: 0,
    sellable: false,
  },
  bucket: {
    value: false,
    sellable: false,
  },
  water: {
    value: 0,
    max: itemMax,
    sellable: false,
  },
  log: {
    value: 0,
    max: itemMax,
    sellable: true,
  },
  'pine-cone': {
    value: 0,
    max: itemMax,
    sellable: false,
  },
};

let items = merge(defaultItems, loadedItems);
items['pine-cone'].place = PineCone;

let money = load('money') || 0;

export { items, money };
