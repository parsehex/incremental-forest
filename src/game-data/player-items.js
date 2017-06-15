import config from '../config';
import { REALLY_BIG_NUMBER } from '../utils';

const testing = config.test;

import PineCone from '../sprites/object/PineCone';

const itemMax = 50;

export const items = {
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
    value: testing ? itemMax : 0,
    max: itemMax,
    sellable: true,
    place: PineCone,
  },
};

export const money = {
  value: testing ? 10000 : 0,
  max: REALLY_BIG_NUMBER,
};
