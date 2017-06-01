import Phaser from 'phaser';

import frames from '../../sprite-frames';

import { facing, notFacing } from './facing';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles_ground', frames.GROUND.TREE_LIGHT);

    this.anchor.setTo(0.5, 0.5);

    // this.facing = facing.bind(this);
    // this.notFacing = notFacing.bind(this);
  }
}
