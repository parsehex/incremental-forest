import merge from 'deepmerge';

import { load } from '../save';
import PineCone from '../sprites/object/PineCone';
import House from '../sprites/object/House';

const itemMax = 500;

const loadedItems = load('items') || {};
const defaultItems = {
  'wood-axe': {
    value: true,
    rank: 0,
    sellable: false,
  },
  'pick-axe': {
    value: false,
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
  house: {
    value: 0,
    max: itemMax,
    sellable: false,
  },
  rocks: {
    value: 0,
    max: itemMax,
    sellable: true,
  },
};

const items = merge(defaultItems, loadedItems);

// re-hook up place-able items
items['pine-cone'].place = PineCone;
items.house.place = House;

const money = load('money') || 0;

export { items, money };
