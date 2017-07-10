import devtools from '../devtools';
import { clamp } from '../utils';
import store from './store';

const testing = devtools.enabled && devtools.betterChances;

const chances = {
  'pine-cone': testing ? 75 : 25,
  'tree-grow': testing ? 25 : 3,
};

export default function getChance(name) {
  return chances[name] + (store[name].count * 1.5);
}
