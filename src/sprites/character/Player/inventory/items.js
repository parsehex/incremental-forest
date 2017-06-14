import config from '../../../../config';
import { REALLY_BIG_NUMBER } from '../../../../utils';

import PineCone from '../../../object/PineCone';

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
    max: 15,
    sellable: false,
  },
  log: {
    value: 0,
    max: config.test ? 1000 : 10,
    sellable: true,
  },
  'pine-cone': {
    value: config.test ? 100 : 0,
    max: 100,
    sellable: true,
    place: PineCone,
  },
};

export const money = {
  value: config.test ? 10000 : 0,
  max: REALLY_BIG_NUMBER,
};
