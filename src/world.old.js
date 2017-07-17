import config from './config';
import { clone } from './utils';
import { tileToPixel } from './tiles';
import { save, saveMe } from './save';

// fastMap just keeps object types in each tile
// the order of items in tiles means nothing
export const fastMap = [];
// fastObjects keeps a list of object types in the map
// the order of items means nothing, will get shuffled around over time
export const fastObjects = [];

const map = [];

const objects = new Map();

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

saveMe(function() {
  // should be able to reload all objects and workers from fastMap
  save('world.fastMap', fastMap);
  save('world.fastObjects', fastObjects);
});

export function count(type) {
  let typeCount = 0;

  for (let i = 0; i < fastObjects.length; i++) {
    if (fastObjects[i] === type) typeCount++;
  }

  return typeCount;
}

const subscribers = [];

function change(tileX, tileY) {
  for (let i = 0; i < subscribers.length; i++) {
    subscribers[i][1](tileX, tileY, objectsAtTile(tileX, tileY));
  }
}
export function removeListener(id) {
  for (let i = 0; i < subscribers.length; i++) {
    if (subscribers[i][0] !== id) continue;

    subscribers.splice(i, 1);
    return;
  }
}
export function onChange(id, callback) {
  subscribers.push([ id, callback ]);
}

export function add(tileX, tileY, id, type, object) {
  objects.set(id, object);

  map[tileY][tileX].push(id);
  fastMap[tileY][tileX].push(type);

  // add objectType to a list of objects on map
  fastObjects.push(type);

  change(tileX, tileY);
}

export function remove(tileX, tileY, id, type) {
  const mapTile = map[tileY][tileX];
  const fastMapTile = fastMap[tileY][tileX];

  const index = mapTile.indexOf(id);

  mapTile.splice(index, 1);
  fastMapTile.splice(index, 1);

  objects.delete(id);

  // remove first instance of objectType (not necessarily the instance that this object added)
  fastObjects.splice(fastObjects.indexOf(type), 1);

  change(tileX, tileY);
}
export function changeType(tileX, tileY, oldType, newType) {
  const fastMapTile = fastMap[tileY][tileX];

  fastMapTile[fastMapTile.indexOf(oldType)] = newType;

  fastObjects[fastObjects.indexOf(oldType)] = newType;
}

export function addCharacter(tileX, tileY, type) {
  fastMap[tileY][tileX].push(type);
  fastObjects.push(type);
}
export function moveCharacter(oldTileX, oldTileY, newTileX, newTileY, type) {
  const oldMapTile = fastMap[oldTileY][oldTileX];
  const oldIndex = oldMapTile.indexOf(type);

  if (oldIndex >= 0) oldMapTile.splice(oldIndex, 1);

  fastMap[newTileY][newTileX].push(type);
}
export function removeCharacter(tileX, tileY, type) {
  const mapTile = fastMap[tileY][tileX];
  const index = mapTile.indexOf(type);

  if (index < 0) return;

  mapTile.splice(index, 1);
  fastObjects.splice(fastObjects.indexOf(type), 1);
}

const boundsWidth = config.mapWidth * config.tileWidth;
const boundsHeight = config.mapHeight * config.tileHeight;
export function objectsAtTile(tileX, tileY) {
  const pixelCoord = tileToPixel(tileX, tileY);

  if (
    pixelCoord.x < 0 || pixelCoord.x > boundsWidth ||
    pixelCoord.y < 0 || pixelCoord.y > boundsHeight
  ) {
    return [];
  }

  const mapTile = map[tileY][tileX];
  const tileObjects = [];

  for (let i = 0, len = mapTile.length; i < len; i++) {
    tileObjects.push(objects.get(mapTile[i]));
  }

  return tileObjects;
}
