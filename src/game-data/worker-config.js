import devtools from '../devtools';
import { clamp } from '../utils';

import merge from 'deepmerge';

let worker = {
  chopper: {
    speed: 1,
    salary: 3,
    deposit: 150,
  },
  collector: {
    speed: 1.25,
    salary: 1,
    deposit: 50,
  },
  planter: {
    speed: 1.5,
    salary: 2,
    deposit: 75,
  },
};

worker = merge(worker, devtools.enabled ? devtools.workers : {});

export { worker };

let chopperWoodAxeRank = 0;

export function getWoodAxeRank() {
  return chopperWoodAxeRank;
}
export function increaseWoodAxeRank() {
  chopperWoodAxeRank = clamp(chopperWoodAxeRank + 1, 0, 24);
}
