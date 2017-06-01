import Phaser from 'phaser';

import frames from '../../sprite-frames';

import { facing, notFacing } from './facing';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles_generator', frames.GENERATOR.OFF);

    this.anchor.setTo(0.5, 0.5);

    this.water = 0;

    this.facing = facing.bind(this);
    this.notFacing = notFacing.bind(this);

    this.interact = interact.bind(this);
  }
}
