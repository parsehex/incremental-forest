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
  direction = direction.toLowerCase();

  switch (direction) {
    case 'up': {
      return 'w';
    }
    case 'left': {
      return 'a';
    }
    case 'down': {
      return 's';
    }
    case 'right': {
      return 'd';
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
