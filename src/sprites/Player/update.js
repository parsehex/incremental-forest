import frames from '../../sprite-frames';

export default function update() {
  checkControls.call(this);
}

function checkControls() {
  const keys = this.game.state.states.Game.keys;

  const upPressed = keys.UP.justPressed();
  const leftPressed = keys.LEFT.justPressed();
  const downPressed = keys.DOWN.justPressed();
  const rightPressed = keys.RIGHT.justPressed();

  const { tileHeight, tileWidth } = this.game.state.states.Game.map;

  if (upPressed) {
    this.frame = frames.GUY.STAND_UP;
    tryMove.call(this, {
      x: this.x,
      y: this.y - tileHeight,
    });
  }
  if (leftPressed) {
    this.frame = frames.GUY.STAND_LEFT;
    tryMove.call(this, {
      x: this.x - tileWidth,
      y: this.y,
    });
  }
  if (downPressed) {
    this.frame = frames.GUY.STAND_DOWN;
    tryMove.call(this, {
      x: this.x,
      y: this.y + tileHeight,
    });
  }
  if (rightPressed) {
    this.frame = frames.GUY.STAND_RIGHT;
    tryMove.call(this, {
      x: this.x + tileWidth,
      y: this.y,
    });
  }
}

function tryMove(nextCoord) {
  const game = this.game.state.states.Game;

  const nextTile = game.map.getTileWorldXY(nextCoord.x, nextCoord.y, 32, 32, 'foreground');

  if (nextTile !== null) {
    tweenMove.call(this, nextCoord);
  }
}

function tweenMove(nextCoord) {
  const move = this.game.add.tween(this);

  move.to(nextCoord, 50, null, true);
}
