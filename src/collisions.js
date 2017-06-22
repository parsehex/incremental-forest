import { objectsAtTile, fastMap } from './world';
import { pixelToTile } from './tiles';
import getGame from './game';
import config from './config';

export default function checkCollide(pixelCoord) {
  const { x, y } = pixelCoord;
  const { bounds } = getGame().world;

  // check if next coord is out of bounds
  if (x < 0 || x > bounds.width || y < 0 || y > bounds.height) {
    return {
      collides: true,
      objects: [],
    };
  }

  const tileCoord = pixelToTile(pixelCoord);
  const objects = objectsAtTile(tileCoord);

  for (let i = 0, len = objects.length; i < len; i++) {
    if (objects[i].collides !== false) {
      return {
        collides: true,
        objects,
      };
    }
  }

  return {
    collides: false,
    objects,
  };
}

// doesn't return array of objects colliding with, just true or false if colliding
export function quickCheckCollide(tileCoord, addedCollidables) {
  addedCollidables = addedCollidables || [];

  const { mapWidth, mapHeight } = config;
  const { x, y } = tileCoord;

  const collidables = collidableObjects.concat(addedCollidables);

  // check if next coord is out of bounds
  if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) return true;

  const mapTile = fastMap[y][x];

  for (let i = 0; i < mapTile.length; i++) {
    if (collidables.includes(mapTile[i])) return true;
  }

  return false;
}

export const collidableObjects = [
  'tree',
  'water',
  'generator',
];
