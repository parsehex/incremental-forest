import devtools from '../devtools';
import { REALLY_BIG_NUMBER } from '../utils';

import PineCone from '../sprites/object/PineCone';

const itemMax = 50;

let items = {
  'wood-axe': {
    value: true,
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
  value: 10000,
  max: REALLY_BIG_NUMBER,
};

items = Object.assign(items, devtools.enabled ? devtools.items : {});
money = Object.assign(money, devtools.enabled ? devtools.money : {});

export { items, money };
