import devtools from '../devtools';
import { clamp } from '../utils';

const testing = devtools.enabled && devtools.betterChances;

const chances = {
  seedDrop: testing ? 75 : 25,
  treeGrow: testing ? 25 : 3,
};

export default function getChance(name) {
  return chances[name];
}

export function increaseChance(name) {
  if (name === 'seedDrop') {
    chances.seedDrop = clamp(chances.seedDrop + 3, 0, 95);
  } else if (name === 'treeGrow') {
    chances.treeGrow = clamp(chances.treeGrow + 2, 0, 90);
  }
}
