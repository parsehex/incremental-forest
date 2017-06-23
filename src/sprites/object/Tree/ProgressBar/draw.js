import Phaser from 'phaser';

import { tileToPixel } from '../../../../tiles';
import { nextCoord } from '../../../../utils';

export default function draw() {
  let pixelCoord = { x: 0, y: 0 };

  pixelCoord.x -= 16;
  pixelCoord.y -= 16;

  const graphic = new Phaser.Graphics(this.game, pixelCoord.x, pixelCoord.y);

  graphic.beginFill(Phaser.Color.getColor(129, 212, 250), 0.8);
  graphic.drawRect(0, 0, 28, 32);
  graphic.endFill();

  this.graphic = graphic;
  this.graphic.height = 6;
  this.graphic.x += 2;
  this.graphic.y += 22;

  this.tree.addChild(this.graphic);
}
