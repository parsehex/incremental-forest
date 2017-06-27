import devtools from '../devtools';
import { clamp } from '../utils';

import merge from 'deepmerge';

const chopper = {
  speed: 1.5,
  salary: 3,
  deposit: 150,
};
const collector = {
  speed: 1.5,
  salary: 1,
  deposit: 150,
};
const planter = {
  speed: 1.5,
  salary: 2,
  deposit: 75,
};
const workers = { chopper, collector, planter };

export { chopper, collector, planter };

export function increaseSpeed(workerType) {
  workers[workerType].speed = clamp(workers[workerType].speed - 0.1, 0.5, 2);
}

let chopperWoodAxeRank = 1;
export function getWoodAxeRank() {
  return chopperWoodAxeRank;
}
export function increaseWoodAxeRank() {
  chopperWoodAxeRank = clamp(chopperWoodAxeRank + 1, 0, 24);
}
