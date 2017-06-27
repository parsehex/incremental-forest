import devtools from '../devtools';
import { REALLY_BIG_NUMBER } from '../utils';

import merge from 'deepmerge';

import PineCone from '../sprites/object/PineCone';

const itemMax = 500;

let items = {
  'wood-axe': {
    value: true,
    rank: 1,
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
    sellable: true,
    place: PineCone,
  },
};

let money = {
  value: 0,
  max: REALLY_BIG_NUMBER,
};

items = merge(items, devtools.enabled ? devtools.items : {});
money = merge(money, devtools.enabled ? devtools.money : {});

export { items, money };
