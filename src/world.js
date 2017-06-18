import config from './config';
import { indexOfObject, clone } from './utils';
import { tileToPixel } from './tiles';

// fastMap just keeps object types in each tile
// the order of items in tiles means nothing
export const fastMap = {};
// fastObjects keeps a list of object types in the map
// the order of items means nothing, will get shuffled around over time
export const fastObjects = [];

const map = {};
const objects = {};

export function getMap() {
  return clone(map);
}

(function generateMap() {
  for (let i = 0; i < config.mapHeight; i++) {
    for (let k = 0; k < config.mapWidth; k++) {
      map[k + ',' + i] = [];
      fastMap[k + ',' + i] = [];
    }
  }
})();

export function count(type) {
  let typeCount = 0;

  for (let i = 0; i < fastObjects.length; i++) {
    if (fastObjects[i] === type) typeCount++;
  }

  return typeCount;
}

const subscribers = [];

function change(tileCoord) {
  for (let i = 0; i < subscribers.length; i++) {
    subscribers[i](tileCoord, objectsAtTile(tileCoord));
  }
}
// NOTE can't unsubscribe; might be an issue later
export function onChange(callback) {
  subscribers.push(callback);
}

export function add() {
  objects[this.id] = this;

  const coordName = this.tile.x + ',' + this.tile.y;

  map[coordName].push(this.id);
  fastMap[coordName].push(this.objectType);

  // add objectType to a list of objects on map
  fastObjects.push(this.objectType);

  change(this.tile);
}

export function remove() {
  const coordName = this.tile.x + ',' + this.tile.y;

  const mapTile = map[coordName];
  const fastMapTile = fastMap[coordName];

  const index = mapTile.indexOf(this.id);

  mapTile.splice(index, 1);
  fastMapTile.splice(index, 1);

  delete objects[this.id];

  // remove first instance of objectType (not necessarily the instance that this object added)
  fastObjects.splice(fastObjects.indexOf(this.objectType), 1);

  change(this.tile);
}

export function addCharacter(tileCoord, type) {
  fastMap[tileCoord.x + ',' + tileCoord.y].push(type);
}
export function moveCharacter(oldTileCoord, newTileCoord, type) {
  const oldMapTile = fastMap[oldTileCoord.x + ',' + oldTileCoord.y];
  const oldIndex = oldMapTile.indexOf(type);

  if (oldIndex >= 0) oldMapTile.splice(oldIndex, 1);

  fastMap[newTileCoord.x + ',' + newTileCoord.y].push(type);
}
export function removeCharacter(tileCoord, type) {
  const mapTile = fastMap[tileCoord.x + ',' + tileCoord.y];
  const index = mapTile.indexOf(type);

  if (index < 0) return;

  mapTile.splice(index, 1);
}

// TODO objectTypesAtTile?
export function objectsAtTile(tileCoord) {
  const pixelCoord = tileToPixel(tileCoord);
  const boundsWidth = config.mapWidth * config.tileWidth;
  const boundsHeight = config.mapHeight * config.tileHeight;

  if (
    pixelCoord.x < 0 || pixelCoord.x > boundsWidth ||
    pixelCoord.y < 0 || pixelCoord.y > boundsHeight
  ) {
    return [];
  }

  const mapTile = map[tileCoord.x + ',' + tileCoord.y];
  const tileObjects = [];

  for (let i = 0, len = mapTile.length; i < len; i++) {
    tileObjects.push(objects[mapTile[i]]);
  }

  return tileObjects;
}

// returns a tile with no objects near `tileCoord`
// if fallback is true and there are no tiles available, `tileCoord` is returned
// returned tile is not guaranteed to be the one nearest `tileCoord`
export function availableTileNear(tileCoord, fallback) {
  const mapTiles = Object.keys(fastMap);
  const i = mapTiles.indexOf(tileCoord.x + ',' + tileCoord.y);

  // check all tiles after tileCoord for an empty tile
  for (let k = i + 1; k < mapTiles.length; k++) {
    if (fastMap[mapTiles[k]].length === 0) {
      return {
        x: +mapTiles[k].split(',')[0],
        y: +mapTiles[k].split(',')[1],
      };
    }
  }

  // check all tiles before tileCoord for an empty tile
  for (let k = i - 1; k >= 0; k--) {
    if (fastMap[mapTiles[k]].length === 0) {
      return {
        x: +mapTiles[k].split(',')[0],
        y: +mapTiles[k].split(',')[1],
      };
    }
  }

  // no empty tiles

  // return fallback if set
  if (fallback) return tileCoord;
}
