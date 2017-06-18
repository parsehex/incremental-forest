import Phaser from 'phaser';

import { num } from '../../../utils';

const keys = [
  'UP', 'DOWN', 'LEFT', 'RIGHT', 'W', 'S', 'A', 'D', // movement
  'SPACEBAR', // interact
  'Q', 'E', // seek item slots (previous, next)
  num(1), num(2), num(3), num(4), num(5), num(6), num(7), num(8), // select item slot by number
  'H', // hire worker
  'F', // fire worker
  'L', // sell selected item
];

export default function setupKeys() {
  const keyboard = this.game.input.keyboard;

  this.keys = {};

  for (let i = 0; i < keys.length; i++) {
    const key = Phaser.Keyboard[keys[i]];
    this.keys[keys[i]] = keyboard.addKey(key);

    keyboard.addKeyCapture(key);
  }

  // console.log(this.keys);
}
