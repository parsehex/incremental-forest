import Phaser from 'phaser';

import { centerGameObjects } from '../../utils';

export default function preload() {
  this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
  this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
  centerGameObjects([this.loaderBg, this.loaderBar]);

  this.load.setPreloadSprite(this.loaderBar);

  // load assets
  this.game.load.spritesheet('guy', '/assets/sprites/chars/guy.png', 32, 32);

  this.game.load.tilemap('forest', '/assets/tilemaps/forest.json', null, Phaser.Tilemap.TILED_JSON);

  this.game.load.spritesheet('tiles_ground', '/assets/sprites/ground.png', 32, 32);
  this.game.load.spritesheet('tiles_generator', '/assets/sprites/other/generator.png', 32, 32);
}
