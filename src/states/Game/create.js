import Player from '../../sprites/Player';
import { findObjByKey } from '../../utils';
import TilemapWalker from 'tilemap-walker';

export default function create() {
  addMap.call(this);
  addPlayer.call(this);
  setupKeys.call(this);
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

function setupKeys() {
  const keyboard = this.game.input.keyboard;

  this.keys = {
    LEFT: keyboard.addKey(Phaser.Keyboard.LEFT),
    RIGHT: keyboard.addKey(Phaser.Keyboard.RIGHT),
    UP: keyboard.addKey(Phaser.Keyboard.UP),
    DOWN: keyboard.addKey(Phaser.Keyboard.DOWN),
    SPACE: keyboard.addKey(Phaser.Keyboard.SPACEBAR),
  };

  // prevent the following keys from being handled by the browser
  keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.SPACEBAR,
  ]);
}
