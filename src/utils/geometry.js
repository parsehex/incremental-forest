import config from '../config';

export function centerOfObject(object, map) {
  return {
    x: object.x + (map.tileWidth / 2),
    y: object.y - (map.tileHeight / 2),
  };
}

export function nextCoord(coord, direction, size) {
  const { x, y } = coord;

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

export function pixelOutOfBounds(pixelCoord) {
  return (
    pixelCoord.x < 0 || pixelCoord.x >= config.gameWidth ||
    pixelCoord.y < 0 || pixelCoord.y >= config.gameHeight
  );
}
export function tileOutOfBounds(tileCoord) {
  return (
    tileCoord.x < 0 || tileCoord.x >= config.mapWidth ||
    tileCoord.y < 0 || tileCoord.y >= config.mapHeight
  );
}
