import config from './config';
import { indexOfObject, clone } from './utils';
import { tileToPixel } from './tiles';

const map = {};
const objects = {};

export function getMap() {
  return clone(map);
}

(function generateMap() {
  for (let i = 0; i < config.mapHeight; i++) {
    for (let k = 0; k < config.mapWidth; k++) {
      map[k + ',' + i] = [];
    }
  }
})();

export function add() {
  objects[this.id] = this;

  map[this.tile.x + ',' + this.tile.y].push(this.id);
}

// move






  mapNewTile.push(objects[this.id]);
}

export function remove() {
  const mapTile = map[this.tile.x + ',' + this.tile.y];
  const index = mapTile.indexOf(this.id);

  mapTile.splice(index, 1);

  delete objects[this.id];
}

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
  const mapTiles = Object.keys(map);
  const i = mapTiles.indexOf(tileCoord.x + ',' + tileCoord.y);

  // check all tiles after tileCoord for an empty tile
  for (let k = i + 1; k < mapTiles.length; k++) {
    if (map[mapTiles[k]].length === 0) {
      return {
        x: +mapTiles[k].split(',')[0],
        y: +mapTiles[k].split(',')[1],
      };
    }
  }

  // check all tiles before tileCoord for an empty tile
  for (let k = i - 1; k >= 0; k--) {
    if (map[mapTiles[k]].length === 0) {
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
