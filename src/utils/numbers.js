import getGame from '../game';

export const REALLY_BIG_NUMBER = 999999999999999;

const numbers = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
export function num(number) {
  return numbers[number];
}

export const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

export function tryChance(chance) {
  const randomNumber = getGame().rnd.integerInRange(0, 100);

  return randomNumber <= chance;
}

export function wrap(value, length) {
  if (value < 0) return length - 1;
  if (value >= length) return 0;
  return value;
}
