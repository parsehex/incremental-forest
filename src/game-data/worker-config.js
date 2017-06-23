import devtools from '../devtools';

import merge from 'deepmerge';

let worker = {
  chopper: {
    speed: 1,
    salary: 3,
    deposit: 150,
  },
  collector: {
    speed: 0.5,
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
