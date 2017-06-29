import Phaser from 'phaser';

import { centerGameObjects } from '../../utils';
import devtools from '../../devtools';

export default function preload() {
  this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
  this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
  centerGameObjects([this.loaderBg, this.loaderBar]);

  this.load.setPreloadSprite(this.loaderBar);

  // load assets
  this.game.load.tilemap('forest', 'assets/tilemaps/forest.json', null, Phaser.Tilemap.TILED_JSON);
  if (devtools.testMap) {
    this.game.load.tilemap('test', 'assets/tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
  }

  this.game.load.spritesheet('guy', 'assets/spritesheets/guy.png', 32, 32);
  this.game.load.spritesheet('worker-collector', 'assets/spritesheets/worker-collector.png', 32, 32);
  this.game.load.spritesheet('worker-chopper', 'assets/spritesheets/worker-chopper.png', 32, 32);
  this.game.load.spritesheet('tiles', 'assets/spritesheets/tiles.png', 32, 32);
}
