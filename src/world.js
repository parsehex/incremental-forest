import config from './config';
import { indexOfObject, clone } from './utils';
import { tileToPixel } from './tiles';

// fastMap just keeps object types in each tile
// the order of items in tiles means nothing
export const fastMap = [];
// fastObjects keeps a list of object types in the map
// the order of items means nothing, will get shuffled around over time
export const fastObjects = [];


// TODO change map to 2d array (map[y][x] instead of map[x + ',' + y])
const map = [];

const objects = {};

export function getMap() {
  return clone(map);
}

(function generateMap() {
  for (let y = 0; y < config.mapHeight; y++) {
    map[y] = [];
    fastMap[y] = [];

    for (let x = 0; x < config.mapWidth; x++) {
      map[y][x] = [];
      fastMap[y][x] = [];
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

  map[this.tile.y][this.tile.x].push(this.id);
  fastMap[this.tile.y][this.tile.x].push(this.objectType);

  // add objectType to a list of objects on map
  fastObjects.push(this.objectType);

  change(this.tile);
}

export function remove() {
  const mapTile = map[this.tile.y][this.tile.x];
  const fastMapTile = fastMap[this.tile.y][this.tile.x];

  const index = mapTile.indexOf(this.id);

  mapTile.splice(index, 1);
  fastMapTile.splice(index, 1);

  delete objects[this.id];

  // remove first instance of objectType (not necessarily the instance that this object added)
  fastObjects.splice(fastObjects.indexOf(this.objectType), 1);

  change(this.tile);
}
export function changeType(newType) {
  const fastMapTile = fastMap[this.tile.y][this.tile.x];

  fastMapTile[fastMapTile.indexOf(this.objectType)] = newType;

  fastObjects[fastObjects.indexOf(this.objectType)] = newType;
}

export function addCharacter(tileCoord, type) {
  fastMap[tileCoord.y][tileCoord.x].push(type);
}
export function moveCharacter(oldTileCoord, newTileCoord, type) {
  const oldMapTile = fastMap[oldTileCoord.y][oldTileCoord.x];
  const oldIndex = oldMapTile.indexOf(type);

  if (oldIndex >= 0) oldMapTile.splice(oldIndex, 1);

  fastMap[newTileCoord.y][newTileCoord.x].push(type);
}
export function removeCharacter(tileCoord, type) {
  const mapTile = fastMap[tileCoord.y][tileCoord.x];
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

  const mapTile = map[tileCoord.y][tileCoord.x];
  const tileObjects = [];

  for (let i = 0, len = mapTile.length; i < len; i++) {
    tileObjects.push(objects[mapTile[i]]);
  }

  return tileObjects;
}
