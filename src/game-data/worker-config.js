import config from '../config';

const testing = config.test;

export const worker = {
  chopper: {
    speed: testing ? 0.4 : 1,
    salary: 3,
    payTime: 1,
  },
  collector: {
    speed: testing ? 0.4 : 1,
    salary: 3,
    payTime: 1,
  },
  planter: {
    speed: testing ? 0.4 : 1,
    salary: 3,
    payTime: 1,
  },
};
