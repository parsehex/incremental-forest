export default function init() {
  // console.log('Boot init');

  this.stage.backgroundColor = '#eee';

  // prevent the following keys from being handled by the browser
  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.SPACEBAR,
  ]);
}
