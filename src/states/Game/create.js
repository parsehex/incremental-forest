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
  const playerStartObj = findObjByKey(this.map.objects.objects, 'name', 'playerStart');

  const playerStart = {
    x: playerStartObj.x + (this.map.tileWidth / 2),
    y: playerStartObj.y - (this.map.tileHeight / 2),
  };

  this.player = new Player({
    game: this.game,
    x: playerStart.x,
    y: playerStart.y
  });

  this.game.add.existing(this.player);

  this.game.camera.follow(this.player);
}

function setupKeys() {
  const keyboard = this.game.input.keyboard;

  this.keys = {
    UP: keyboard.addKey(Phaser.Keyboard.UP),
    LEFT: keyboard.addKey(Phaser.Keyboard.LEFT),
    DOWN: keyboard.addKey(Phaser.Keyboard.DOWN),
    RIGHT: keyboard.addKey(Phaser.Keyboard.RIGHT),
    W: keyboard.addKey(Phaser.Keyboard.W),
    A: keyboard.addKey(Phaser.Keyboard.A),
    S: keyboard.addKey(Phaser.Keyboard.S),
    D: keyboard.addKey(Phaser.Keyboard.D),
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
