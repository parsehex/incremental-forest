import config from '../../../../config';
import { REALLY_BIG_NUMBER } from '../../../../utils';

import PineCone from '../../../object/PineCone';

const itemMax = 50;

export default {
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
    value: config.test ? itemMax : 0,
    max: itemMax,
    sellable: true,
    place: PineCone,
  },
};

export const money = {
  value: config.test ? 10000 : 0,
  max: REALLY_BIG_NUMBER,
};
