import Phaser from 'phaser';

export default function draw() {
  const graphic = new Phaser.Graphics(this.game, -16, -16);

  graphic.beginFill(Phaser.Color.getColor(129, 212, 250), 0.8);
  graphic.drawRect(0, 0, 28, 32);
  graphic.endFill();

  this.graphic = graphic;
  this.graphic.height = 6;
  this.graphic.x += 2;
  this.graphic.y += 22;

  this.tree.addChild(this.graphic);
}
