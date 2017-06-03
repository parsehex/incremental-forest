import TilemapWalker from 'tilemap-walker';

import frames from '../../../sprite-frames';

export default function addMap() {
  this.map = this.game.add.tilemap('forest');

  this.map.addTilesetImage('sprites', 'tiles', 32, 32);

  this.layers = {};

  this.layers.background = this.map.createLayer('background');

  this.layers.background.resizeWorld();

  // set up tilemap walker
  this.mapWalker = new TilemapWalker(this.game, this.map);
}
