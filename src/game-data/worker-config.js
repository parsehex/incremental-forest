import devtools from '../devtools';

import merge from 'deepmerge';

let worker = {
  chopper: {
    speed: 1,
    salary: 15,
    deposit: 25, // salary * 5
  },
  collector: {
    speed: 0.5,
    salary: 2,
    deposit: 10,
  },
  planter: {
    speed: 0.75,
    salary: 5,
    deposit: 25,
  },
};

worker = merge(worker, devtools.enabled ? devtools.workers : {});

export { worker };
