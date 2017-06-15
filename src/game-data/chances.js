import config from '../config';

const testing = config.test;

export const seedDrop = testing ? 75 : 50;
export const treeGrow = testing ? 25 : 10;
