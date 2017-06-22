import devtools from '../devtools';

import merge from 'deepmerge';

let worker = {
  chopper: {
    speed: 1,
    salary: 7,
    deposit: 35, // salary * 5
  },
  collector: {
    speed: 0.5,
    salary: 2,
    deposit: 10,
  },
  planter: {
    speed: 0.75,
    salary: 7,
    deposit: 35,
  },
};

worker = merge(worker, devtools.enabled ? devtools.workers : {});

export { worker };
