import Phaser from 'phaser';

export default function setupKeys() {
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
    Q: keyboard.addKey(Phaser.Keyboard.Q),
    E: keyboard.addKey(Phaser.Keyboard.E),
    H: keyboard.addKey(Phaser.Keyboard.H),
  };

  // prevent the following keys from being handled by the browser
  keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.SPACEBAR,
    Phaser.Keyboard.Q,
    Phaser.Keyboard.H,
  ]);
}
