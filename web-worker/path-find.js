const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
function convertPath(path) {
  for (let i = 0; i < path.length; i++) {
    path[i] = directions[path[i]];
  }
  return path;
}

let firstRun = true;
onmessage = function(event) {
  // expect posted message data to be in a certain format
  if (!Array.isArray(event.data)) throw new Error('pass an array to worker');
  let testing = false && firstRun && event.data[5].x === 10 && event.data[5].y === 0;

  let now = performance.now();

  let path = findPath(event.data);
  if (path) path = convertPath(path);

  if (testing) {
    verifyPath(path);
    firstRun = false;
  }

  postMessage(path);
  if (testing) console.log(performance.now() - now);
}

function verifyPath(path) {
  const correctPath = '["DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","DOWN","LEFT","DOWN","DOWN","RIGHT"]';
  if (JSON.stringify(path) !== correctPath) {
    console.error('path fails test');
    console.groupCollapsed('paths');
    console.log('expected:', correctPath);
    console.log('actual:', path);
    console.groupEnd();
  } else {
    console.info('path passes test');
  }
}

function findPath(data) {
  const fastMap =           data[0],
        fastObjects =       data[1],
        collidableObjects = data[2];

  const mapWidth =          data[3],
        mapHeight =         data[4];

  let queue =             [],
      checkedTiles =      [],
      start =             data[5],
      target =            data[6];

  if (typeof target === 'string') {
    target = [target];
  }

  const targetIsArray = Array.isArray(target);

  if (targetIsArray) {
    let includes = false;
    for (let i = 0; i < target.length; i++) {
      if (fastObjects.includes(target[i])) {
        includes = true;
        break;
      }
    }

    if (!includes) return;
  }

  const startLocation = {
    x: start.x,
    y: start.y,
    path: [],
    walkable: true,
  };

  queue.push(startLocation);

  checkedTiles.push(startLocation.x + ',' + startLocation.y);

  let debug = 0;
  while (queue.length && debug <= 1000) { // infinite loop protection
    let item = queue[0];

    const up = processDirection(item, 0);
    if (up) return up;

    const down = processDirection(item, 1);
    if (down) return down;

    const left = processDirection(item, 2);
    if (left) return left;

    const right = processDirection(item, 3);
    if (right) return right;

    // remove first item in queue
    queue.shift();

    debug++;
  }

  return [];

  function processDirection(location, direction) {
    const result = checkDirection(location, direction);

    const coordName = result.x + ',' + result.y;

    // don't want to check the same tile twice
    if (checkedTiles.includes(coordName)) return;

    // add the resulting tile to checkedTiles
    checkedTiles.push(coordName);

    // result is out of bounds
    if (result.outOfBounds) return;

    let isTarget = false;
    if (targetIsArray) {
      isTarget = checkTargetType(coordName, target);
    } else if (target === null) {
      isTarget = checkTargetEmpty(coordName);
    } else {
      isTarget = checkTargetLocation(result);
    }

    if (isTarget) {
      // result is the target
      return result.path;
    } else if (result.walkable) {
      // result isn't target but is still walkable; add to queue to check
      queue.push(result);
    }
  }

  function checkTargetType(coordName, targetTypes) {
    // TODO prefer (but not require) tiles with no objects at all on them

    const mapTile = fastMap[coordName];
    for (let i = 0; i < targetTypes.length; i++) {
      if (mapTile.includes(targetTypes[i])) {
        return true;
      }
    }
  }

  function checkTargetEmpty(coordName) {
    return fastMap[coordName].length === 0;
  }

  function checkTargetLocation(location) {
    if (location.x === target.x && location.y === target.y) return true;

    return false;
  }

  function checkDirection(location, direction) {
    // manually clone location object
    location = {
      x: location.x,
      y: location.y,
      path: location.path.slice(), // clones location.path (quicker than JSON.parse+stringify)
      walkable: location.walkable,
    };

    location.path.push(direction);

    location.walkable = true;

    // update location coords based on direction
    nextCoord(location, direction);
    const { x, y } = location;

    if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) {
      location.outOfBounds = true;
      return location;
    }

    const mapTile = fastMap[x + ',' + y];

    for (let i = 0; i < collidableObjects.length; i++) {
      if (mapTile.includes(collidableObjects[i])) {
        location.walkable = false;
        break;
      }
    }

    return location;
  }
}

// utility function dependencies
function nextCoord(coord, direction) {
  if (direction === 0) {
    coord.y = coord.y - 1;
  } else if (direction === 1) {
    coord.y = coord.y + 1;
  } else if (direction === 2) {
    coord.x = coord.x - 1;
  } else if (direction === 3) {
    coord.x = coord.x + 1;
  }
}
