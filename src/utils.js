import config from './config';

export const REALLY_BIG_NUMBER = 999999999999999;

export function centerGameObjects(objects) {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

export function centerOfObject(object, map) {
  return {
    x: object.x + (map.tileWidth / 2),
    y: object.y - (map.tileHeight / 2),
  };
}

export function findObjByKey(array, key, value) {
  for(let i = 0, len = array.length; i < len; i++) {
    let object = array[i];
    if (typeof object === 'object' && object.hasOwnProperty(key) && object[key] === value) {
      return object;
    }
  }
  return false;
}

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

export function directionToWASD(direction) {
  switch (direction) {
    case 'UP': {
      return 'W';
    }
    case 'LEFT': {
      return 'A';
    }
    case 'DOWN': {
      return 'S';
    }
    case 'RIGHT': {
      return 'D';
    }
  }
}

export const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

export function nextCoord(coord, direction, size) {
  const { x, y } = coord;

  switch (direction) {
    case 'UP': {
      return { x: x, y: y - size };
    }
    case 'LEFT': {
      return { x: x - size, y: y };
    }
    case 'DOWN': {
      return { x: x, y: y + size };
    }
    case 'RIGHT': {
      return { x: x + size, y: y };
    }
  }
}

export function indexOfObject(arr, name, value) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i][name] === value) return i;
  }
  return -1;
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

export function tryChance(chance) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  return randomNumber <= chance;
}

export function wrap(value, length) {
  if (value < 0) return length - 1;
  if (value >= length) return 0;
  return value;
}
