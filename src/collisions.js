import world from './world';
import { pixelToTile } from './tiles';
import config from './config';

const boundsWidth = config.mapWidth * config.tileWidth;
const boundsHeight = config.mapHeight * config.tileHeight;
const { mapWidth, mapHeight } = config;

export default function checkCollide(pixX, pixY, id) {
  // check if next coord is out of bounds
  if (pixX < 0 || pixX > boundsWidth || pixY < 0 || pixY > boundsHeight) {
    return {
      collides: true,
      objects: [],
    };
  }

  const tileCoord = pixelToTile(pixX, pixY);
  const objects = world.tile(tileCoord.x, tileCoord.y).slice(); // copy array

  for (let i = 0, len = objects.length; i < len; i++) {
    if (objects[i].collides !== false && objects[i].id !== id) {
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
export function quickCheckCollide(tileX, tileY, addedCollidables) {
  addedCollidables = addedCollidables || [];

  const collidables = collidableObjects.concat(addedCollidables);

  // check if next coord is out of bounds
  if (tileX < 0 || tileX >= mapWidth || tileY < 0 || tileY >= mapHeight) return true;

  const mapTile = world.fastTile(tileX, tileY);

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
