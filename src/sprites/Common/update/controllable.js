import Phaser from 'phaser';

import { movedTo } from '../../../world';
import { tile, nextTile } from '../../../tiles';
import { checkCollide } from './collisions';
import {
  directionToWASD,
  nextCoord as getNextCoord,
  circularJSONReplacer
} from '../../../utils';

export default function(frames) {
  checkControl = checkControl.bind(this);

  // early-return if any single key is being pressed
  if (checkControl('up', frames)) return;
  if (checkControl('left', frames)) return;
  if (checkControl('down', frames)) return;
  if (checkControl('right', frames)) return;

  const { SPACE } = this.game.state.states.Game.keys;

  if (this.faceObjects.length > 0 && SPACE.justPressed()) {
    interfaceWithObjects(this.faceObjects, 'interact');
  }
}

function checkControl(direction, frames, bypass) {
  direction = direction.toUpperCase();
  const directionKey = directionToWASD(direction).toUpperCase();

  const keys = this.game.state.states.Game.keys;

  const pressed = keys[direction].justPressed() || keys[directionKey].justPressed() || bypass;

  if (pressed && !this.moving) {
    const { tileHeight, tileWidth } = this.game.state.states.Game.map;

    const thisCoord = {
      x: this.x,
      y: this.y,
    };

    const nextCoord = getNextCoord.call(this, thisCoord, direction, 32);

    tryMove.call(this, nextCoord, direction, frames);

    this.game.time.events.add(Phaser.Timer.SECOND / 5, function() {
      if (!keys[direction].isDown && !keys[directionKey].isDown) {
        return;
      }

      // TODO just directly call tryMove?
      checkControl.call(this, direction, frames, true);
    }, this);

    return true;
  }
}

function tryMove(nextCoord, direction, frames) {
  const frameName = 'STAND_' + direction.toUpperCase();
  this.frame = frames[frameName];

  this.faceDirection = direction;

  const collisions = checkCollide.call(this, nextCoord);

  if (collisions.collides === false) {

    interfaceWithObjects(collisions.objects, 'collide');

    tweenMove.call(this, nextCoord);
  } else {
    checkFacing.call(this);

    this.drawCursor();
  }
}

function tweenMove(nextCoord) {
  const oldTile = this.tile;

  const move = this.game.add.tween(this);

  this.moving = true;

  move.to(nextCoord, 50, null, true);

  this.drawCursor(true);

  move.onComplete.add(function() {
    this.moving = false;

    this.tile = tile.call(this);

    movedTo.call(this, oldTile);

    checkFacing.call(this);
  }, this);
}

export function checkFacing() {
  // TODO maybe check if already facing direction and early-return?

  const map = this.game.state.states.Game.map;

  const thisPixelCoord = {
    x: this.x,
    y: this.y,
  };

  const direction = this.faceDirection;

  const facingPixelCoord = getNextCoord.call(this, thisPixelCoord, direction, 32);

  const facingObjects = checkCollide.call(this, facingPixelCoord);

  if (this.faceObjects.length > 0) {
    interfaceWithObjects(this.faceObjects, 'notFacing');

    this.faceObjects.length = 0;
  }

  this.faceObjects = facingObjects.objects;

  interfaceWithObjects(this.faceObjects, 'facing');
}

function interfaceWithObjects(objects, method) {
  for (let i = 0, len = objects.length; i < len; i++) {
    if (objects[i].hasOwnProperty(method)) {
      objects[i][method]();
    }
  }
}
