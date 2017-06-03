import Phaser from 'phaser';

import { alignToGrid } from '../../tiles';

export default class extends Phaser.Sprite {
  constructor(game, x, y, sprite, frame) {
    const alignedCoords = alignToGrid({ x, y });

    x = alignedCoords.x;
    y = alignedCoords.y;

    super(game, x, y, sprite, frame);

    this.anchor.setTo(0.5, 0.5);
  }
}
