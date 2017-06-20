import devtools from '../devtools';

import merge from 'deepmerge';

let worker = {
  chopper: {
    speed: 1,
    salary: 1.5,
    payTime: 1,
  },
  collector: {
    speed: 0.5,
    salary: 1.5,
    payTime: 1,
  },
  planter: {
    speed: 0.75,
    salary: 1.5,
    payTime: 1,
  },
};

worker = merge(worker, devtools.enabled ? devtools.workers : {});

export { worker };
