import Phaser from 'phaser';

import { centerGameObjects } from '../../utils';

export default function preload() {
  // console.log('Splash preload');

  this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
  this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
  centerGameObjects([this.loaderBg, this.loaderBar]);

  this.load.setPreloadSprite(this.loaderBar);

  // load assets
  this.game.load.spritesheet('guy', '/assets/sprites/chars/guy.png', 32, 32);
  this.game.load.tilemap('island', '/assets/tilemaps/level-1.json', null, Phaser.Tilemap.TILED_JSON);
  this.game.load.image('tiles_ground', '/assets/sprites/ground.png');
}
