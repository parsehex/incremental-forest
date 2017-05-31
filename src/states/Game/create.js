import Player from '../../sprites/Player';
import { findObjByKey } from '../../utils';
import TilemapWalker from 'tilemap-walker';

export default function create() {
  addMap.call(this);
  addPlayer.call(this);
}

function addMap() {
  this.map = this.game.add.tilemap('island');

  this.map.addTilesetImage('Ground', 'tiles_ground', 32, 32);

  this.layers = {};
  this.layers.background = this.map.createLayer('background');
  this.layers.foreground = this.map.createLayer('foreground');

  this.layers.background.resizeWorld();

  // set up tilemap walker

  this.mapWalker = new TilemapWalker(this.game, this.map);
}

function addPlayer() {
  const playerStart = findObjByKey(this.map.objects.objects, 'name', 'playerStart');

  this.player = new Player({
    game: this.game,
    x: playerStart.x,
    y: playerStart. y
  });

  this.game.add.existing(this.player);

  this.game.camera.follow(this.player);
}
