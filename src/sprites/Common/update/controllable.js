import {
  checkCollide,
  NO_COLLISION,
  WATER_COLLISION,
} from './collisions';
import { directionToWASD } from '../../../utils';

export default function(frames) {
  checkControl.call(this, 'up', frames);
  checkControl.call(this, 'left', frames);
  checkControl.call(this, 'down', frames);
  checkControl.call(this, 'right', frames);
}

function checkControl(direction, frames) {
  direction = direction.toUpperCase()
  const directionKey = directionToWASD(direction).toUpperCase();

  const keys = this.game.state.states.Game.keys;

  const pressed = keys[direction].justPressed() || keys[directionKey].justPressed();

  if (pressed && !this.moving) {
    const { tileHeight, tileWidth } = this.game.state.states.Game.map;

    const thisCoord = {
      x: this.x,
      y: this.y,
    };

    const nextCoord = adjustCoords.call(this, thisCoord, direction);

    tryMove.call(this, nextCoord, direction, frames);
  }
}

function tryMove(nextCoord, direction, frames) {
  const frameName = 'STAND_' + direction.toUpperCase();
  this.frame = frames[frameName];

  this.faceDirection = direction;

  const collision = checkCollide.call(this, nextCoord);

  if (collision === NO_COLLISION) {
    tweenMove.call(this, nextCoord);
  } else {
    checkFacing.call(this);
  }
}

function tweenMove(nextCoord) {
  const move = this.game.add.tween(this);

  this.moving = true;

  move.to(nextCoord, 50, null, true);

  move.onComplete.add(function() {
    this.moving = false;

    checkFacing.call(this);
  }, this);
}

function checkFacing() {
  const map = this.game.state.states.Game.map;

  const thisCoord = {
    x: this.x,
    y: this.y,
  };

  const direction = this.faceDirection;

  const facingCoord = adjustCoords.call(this, thisCoord, direction);

  const facingObject = checkCollide.call(this, facingCoord);

  if (facingObject !== NO_COLLISION && facingObject !== WATER_COLLISION) {
    if (facingObject.hasOwnProperty('facing')) {
      // object has a .facing() method we should call
      facingObject.facing();
    }
  }
}

function adjustCoords(coord, direction) {
  const { tileWidth, tileHeight } = this.game.state.states.Game.map;

  switch (direction) {
    case 'UP': {
      return {
        x: coord.x,
        y: coord.y - tileHeight,
      };
    }
    case 'LEFT': {
      return {
        x: coord.x - tileWidth,
        y: coord.y,
      };
    }
    case 'DOWN': {
      return {
        x: coord.x,
        y: coord.y + tileHeight,
      };
    }
    case 'RIGHT': {
      return {
        x: coord.x + tileWidth,
        y: coord.y,
      };
    }
  }
}
