export default function update() {
  checkControls.call(this);
}

function checkControls() {
  const keyboard = this.game.input.keyboard;
  const Keys = Phaser.Keyboard;

  const upPressed = keyboard.downDuration(Keys.UP || Keys.W);
  const leftPressed = keyboard.downDuration(Keys.LEFT || Keys.A);
  const downPressed = keyboard.downDuration(Keys.DOWN || Keys.S);
  const rightPressed = keyboard.downDuration(Keys.RIGHT || Keys.D);

  const tileSize = 32;

  if (upPressed) {
    tryMove.call(this, {
      x: this.x,
      y: this.y - tileSize,
    });
  }
  if (leftPressed) {
    tryMove.call(this, {
      x: this.x - tileSize,
      y: this.y,
    });
  }
  if (downPressed) {
    tryMove.call(this, {
      x: this.x,
      y: this.y + tileSize,
    });
  }
  if (rightPressed) {
    tryMove.call(this, {
      x: this.x + tileSize,
      y: this.y,
    });
  }
}

function tryMove(nextCoord) {
  //
}
