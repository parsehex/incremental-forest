export const centerGameObjects = (objects) => {
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

export const findObjByKey = (array, key, value) => {
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

export function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}
