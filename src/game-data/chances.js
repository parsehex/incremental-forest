import devtools from '../devtools';
import { clamp } from '../utils';
import { load } from '../save';

const testing = devtools.enabled && devtools.betterChances;

const upgrades = load('upgrades') || {
  'pine-cone': 0,
  'tree-grow': 0,
};

const chances = {
  seedDrop: testing ? 75 : 25 + upgrades['pine-cone'],
  treeGrow: testing ? 25 : 3 + upgrades['tree-grow'],
};

export default function getChance(name) {
  return chances[name];
}

export function increaseChance(name) {
  if (name === 'seedDrop') {
    chances.seedDrop = clamp(chances.seedDrop + 1, 0, 95);
  } else if (name === 'treeGrow') {
    chances.treeGrow = clamp(chances.treeGrow + 1, 0, 90);
  }
}
