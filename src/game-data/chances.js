import devtools from '../devtools';

const testing = devtools.betterChances;

export const seedDrop = testing ? 75 : 80;
export const treeGrow = testing ? 25 : 10;
