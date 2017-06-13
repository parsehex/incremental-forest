import Phaser from 'phaser';

import frames from '../../../sprite-frames';
import config from '../../../config';

export default function addMap() {
  let mapName = config.test ? 'test' : 'forest';

  this.map = new Phaser.Tilemap(
    this.game,
    mapName,
    32,
    32,
    config.mapWidth,
    config.mapHeight
  );

  this.map.addTilesetImage('sprites', 'tiles', 32, 32);

  this.layers = {
    background: this.map.createLayer('background'),
  };

  this.groups.map.add(this.layers.background);

  this.layers.background.resizeWorld();
}
