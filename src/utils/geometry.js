import config from '../config';

export function centerOfObject(object, map) {
  return {
    x: object.x + (map.tileWidth / 2),
    y: object.y - (map.tileHeight / 2),
  };
}

export function nextCoord(x, y, direction, size) {
  switch (direction) {
    case 'UP': {
      return { x, y: y - size };
    }
    case 'LEFT': {
      return { x: x - size, y };
    }
    case 'DOWN': {
      return { x, y: y + size };
    }
    case 'RIGHT': {
      return { x: x + size, y };
    }
    default: {
      return { x, y };
    }
  }
}

export function pixelOutOfBounds(pixX, pixY) {
  return (
    pixelX < 0 || pixelX >= config.gameWidth ||
    pixelY < 0 || pixelY >= config.gameHeight
  );
}
export function tileOutOfBounds(tileX, tileY) {
  return (
    tileX < 0 || tileX >= config.mapWidth ||
    tileY < 0 || tileY >= config.mapHeight
  );
}
