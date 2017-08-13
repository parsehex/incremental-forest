/*
  notes
  - world solely controls sprites
  - recycles sprites in/out of camera as needed
 */

import config from '../config';
import { save, saveMe } from '../save';

import createMap from './map';
import {
  _notifySubscribers,
  subscribe,
  unsubscribe,
} from './subscriptions';
import {
  add,
  move,
  remove,
} from './objects';

class World {
// export default class World {
  constructor(map) {
    createMap.call(this, map);

    this._subscribers = [];

    saveMe(() => {
      // should be able to reload all objects and workers from fastMap

      save('world.fastMap', this.fastMap);
    });

    this._notifySubscribers = _notifySubscribers.bind(this);
    this.subscribe = subscribe.bind(this);
    this.unsubscribe = unsubscribe.bind(this);

    this.add = add.bind(this);
    this.move = move.bind(this);
    this.remove = remove.bind(this);
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
