export default function update() {
  checkControls.call(this);
}

function checkControls() {
  const keys = this.game.state.states.Game.keys;

  const upPressed = keys.UP.justPressed();
  const leftPressed = keys.LEFT.justPressed();
  const downPressed = keys.DOWN.justPressed();
  const rightPressed = keys.RIGHT.justPressed();

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
