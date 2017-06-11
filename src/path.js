import Phaser from 'phaser';

import { tileToPixel } from './tiles';
import { getMap } from './world';
import checkCollide from './collisions';
import { clone, nextCoord } from './utils';

// target can be a function that returns whether tile is the target or not
/**
 * find a path from start to target
 * @param  {object}             start  the tileCoord to start at (e.g. { x: 0, y: 5 })
 * @param  {object || function} target the tileCoord to find a path to,
 *                                     or a function that returns a bool whether the given tile is the target
 * @return {array}                     an array of directions ('UP', 'LEFT', 'DOWN', 'RIGHT') to reach target
 */
export function findPath(start, target) {
  const map = getMap();

  const startLocation = {
    x: start.x,
    y: start.y,
    path: [],
    walkable: true,
  };

  const checkedTiles = [];
  const queue = [];
  queue.push(startLocation);

  checkedTiles.push(startLocation.x + ',' + startLocation.y);

  let processDir = processDirection.bind({ queue, checkedTiles, target });

  let debug = 0;
  while (queue.length && debug <= 1000) { // infinite loop protection
    let item = queue[0];

    const up = processDir(item, 'UP');
    if (up) {
      return up;
    }

    const left = processDir(item, 'LEFT');
    if (left) {
      return left;
    }

    const down = processDir(item, 'DOWN');
    if (down) {
      return down;
    }

    const right = processDir(item, 'RIGHT');
    if (right) {
      return right;
    }

    // remove first item in queue
    queue.shift();

    debug++;
  }
  return [];
}

function processDirection(location, direction) {
  const result = checkDirection(location, direction);

  const coordName = result.x + ',' + result.y;

  // don't want to check the same tile twice
  if (this.checkedTiles.includes(coordName)) return;

  // add the resulting tile to checkedTiles
  this.checkedTiles.push(coordName);

  let isTarget = false;
  if (typeof this.target === 'function') {
    isTarget = this.target(coordName);
  } else {
    isTarget = checkTarget.call(this, result);
  }

  if (isTarget) {
    // result is the target
    return result.path;
  } else if (result.walkable) {
    // result isn't target but is still walkable; add to queue to check
    this.queue.push(result);
  }
}

function checkTarget(location) {
  if (location.x === this.target.x && location.y === this.target.y) return true;

  return false;
}

function checkDirection(location, direction) {
  location = {
    x: location.x,
    y: location.y,
    path: JSON.parse(JSON.stringify(location.path)),
    walkable: location.walkable,
  };

  // push this direction to location's path in order to be able to retrace the steps to get there
  location.path.push(direction);

  location.walkable = true;

  // update location coords based on direction
  location = Object.assign(location, nextCoord(location, direction, 1));

  // check for collisions at location coord
  const collision = checkCollide(tileToPixel(location));

  if (collision.collides) {
    location.walkable = false;
  }

  return location;
}
