/*
  notes for World class:
  - all x/y coordinates are implied tile coordinates; World doesn't deal with pixels at all
  - where appropriate, methods accept an object which should
      contain relevant props needed for the method (like obj.objectType)
 */

import config from './config';
import { indexOfObject } from './utils';
import { save, saveMe } from './save';

class World {
  constructor() {
    // map is a 1D array of map tiles
    // each tile is an array containing refs to objects on that tile
    this.map = [];

    const len = config.mapHeight * config.mapWidth;
    for (let i = 0; i < len; i++) {
      this.map[i] = [];
    }

    this._subscribers = [];

    saveMe(() => {
      // should be able to reload all objects and workers from fastMap

      save('world.fastMap', this.fastMap);
    });
  }

  add(x, y, object) {
    // add an object to the map

    this.tile(x, y).push(object);

    this._notifySubscribers(x, y, 'add');
  }
  move(fromX, fromY, toX, toY, object) {
    // move an object from one tile to a different tile

    // remove the object from previous tile and inform subscribers
    const fromTile = this.tile(fromX, fromY);
    const fromIndex = indexOfObject(fromTile, 'id', object.id);
    fromTile.splice(fromIndex, 1);

    this._notifySubscribers(fromX, fromY, 'moveFrom');

    // add object to new tile and inform subscribers
    this.tile(toX, toY).push(object);

    this._notifySubscribers(toX, toY, 'moveTo');
  }
  remove(x, y, object) {
    // remove an object from the map

    const tile = this.tile(x, y);
    const tileIndex = indexOfObject(tile, 'id', object.id);
    tile.splice(tileIndex, 1);

    this._notifySubscribers(x, y, 'remove');
  }

  _notifySubscribers(x, y, eventType) {
    // call all subscribers with event info

    const len = this._subscribers.length;
    for (let i = 0; i < len; i++) {
      // inform the subscriber of: change coordinate, objects at tile, type of event
      this._subscribers[i][1](x, y, this.tile(x, y), eventType);
    }
  }
  subscribe(id, callback) {
    // register a subscriber to world events

    this._subscribers.push([ id, callback ]);
  }
  unsubscribe(id) {
    // unregister a subscriber by id to world events

    for (let i = 0; i < this._subscribers.length; i++) {
      // first index of subscriber is the sub's id
      if (this._subscribers[i][0] !== id) continue;

      this._subscribers.splice(i, 1);
      break;
    }
  }

  tile(x, y) {
    // get the map tile at a x/y coordinate

    // return an empty array if coordinates are out of bounds
    if (
      x < 0 || x > config.mapWidth ||
      y < 0 || y > config.mapHeight
    ) {
      return [];
    }

    // NOTE to get index from 2D: x * width + y
      // from https://stackoverflow.com/a/1730975
    return this.map[(y * config.mapHeight) + x];
  }
  fastTile(x, y) {
    // return an array of objectTypes at x/y

    return this.tile(x, y).map((obj) => obj.objectType);
  }

  get fastMap() {
    // return a simple copy of this.map populated with objectTypes instead of entire objects

    const fastMap = [];

    const ilen = this.map.length;
    for (let i = 0; i < ilen; i++) {
      fastMap[i] = [];

      const klen = this.map[i].length;

      for (let k = 0; k < klen; k++) {
        fastMap[i].push(this.map[i][k].objectType);
      }
    }

    return fastMap;
  }
}

export default new World();
